import { useState } from 'react';
import './App.css';

import { SudokuGrid } from './sudoku-grid';
import { type SudokuGrid as GridType, createEmptyGrid, solveSudoku, validateBoard } from './sudoku-solver';

function App() {
  const [grid, setGrid] = useState<GridType>(createEmptyGrid);
  const [isSolving, setIsSolving] = useState(false);

  const handleCellChange = (row: number, col: number, value: number | null) => {
    const newGrid = grid.map((gridRow, rowIndex) =>
      gridRow.map((cell, colIndex) => 
        rowIndex === row && colIndex === col ? value : cell
      )
    );
    setGrid(newGrid);
  }

  const handleSolve = () => {
    setIsSolving(true);

    // check first before trying to solve
    const validation = validateBoard(grid);
    if (!validation.isValid) {
      alert(validation.message)
      setIsSolving(false);
      return;
    }

    const gridToSolve = grid.map(row => [...row]);

    if (solveSudoku(gridToSolve)) {
      setGrid(gridToSolve);
    } else {
      alert('No solution found!');
    }
    setIsSolving(false);
  };

  const handleClear = () => {
    setGrid(createEmptyGrid());
  };

  return (
    <div className="app">
      <h1>Sudoku Solver</h1>
      <SudokuGrid grid={grid} onCellChange={handleCellChange} />

      <div className="controls">
        <button onClick={handleSolve} disabled={isSolving}>
          {isSolving ? 'Solving...' : 'Solve'}
        </button>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  )
}

export default App;
