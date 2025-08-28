import type { SudokuGrid as GridType, CellValue } from "./sudoku-solver";

interface SudokuGridProps {
    grid: GridType;
    onCellChange: (row: number, col: number, value: CellValue) => void;
}

export function SudokuGrid({ grid, onCellChange }: SudokuGridProps) {
    return (
        <div className="sudoku-grid">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="sudoku-row">
                    {row.map((cell, colIndex) => (
                        <input
                            key={colIndex}
                            type="text"
                            value={cell || ''}
                            onChange={(e) => {
                                const value = e.target.value;
                                const numValue = value === '' ? null : parseInt(value);
                                if (numValue === null || (numValue >= 1 && numValue <= 9)) {
                                    onCellChange(rowIndex, colIndex, numValue);
                                }
                            }}
                            className="sudoku-cell"
                            maxLength={1}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}