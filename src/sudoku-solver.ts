// types
// 1-9 cell value
export type CellValue = number | null;
// 9x9 grid
export type SudokuGrid = CellValue[][];

// create an empty 9x9 grid
export function createEmptyGrid(): SudokuGrid {
    return Array(9).fill(null).map(() => Array(9).fill(null));
}

// create puzzle inputs
export function createGridFromArray(puzzle: number[][]): SudokuGrid {
    return puzzle.map(row => row.map(cell => cell === 0 ? null : cell));
}

// validate inputs
export function isValid(grid: SudokuGrid, row: number, col: number, value: number): boolean {
    // rule 1, if the value is already in the same row, dont use it
    if (grid[row].includes(value)) {
        return false;
    }

    // rule 2, if the value is already in the same column, dont use it
    for (let i = 0; i < 9; i++) {
        if (grid[i][col] == value) {
            return false;
        }
    }

    // rule 3, if the value is already in the 3x3 grid, dont use it
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
            if (grid[i][j] === value) {
                return false;
            }
        }
    }

    // rule 4, if the value doesnt conflict with the 3 rules above, use it
    return true;
}

// added for further validation to stop the app from crashing
export function validateBoard(grid: SudokuGrid): { isValid: boolean; message: string } {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const value = grid[row][col];
            if (value !== null) {
                grid[row][col] = null;
                if (!isValid(grid, row, col, value)) {
                    grid[row][col] = value;
                    return {
                        isValid: false,
                        message: `Invalid board: Cell (${row + 1}, ${col + 1}) contains ${value} which violates Sudoku rules`
                    };
                }
                grid[row][col] = value;
            }
        }
    }
    return { isValid: true, message: "" };
}

// the actual solver - the backtracking algo
export function solveSudoku(grid: SudokuGrid): boolean {
    // find the next empty cell
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === null) {
                // try 1-9
                for (let num = 1; num <= 9; num++) {
                    if(isValid(grid, row, col, num)) {
                        grid[row][col] = num;

                        if (solveSudoku(grid)) {
                            return true;
                        }

                        grid[row][col] = null;
                    }
                }
                return false;
            }
        }
    }
    return true;
}