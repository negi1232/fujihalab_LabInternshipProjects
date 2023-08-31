import React, { useState, useEffect } from 'react';
import './styles.css';

type CellValue = 'mine' | number;
type CellState = 'hidden' | 'visible' | 'flag';

interface Cell {
  value: CellValue;
  state: CellState;
}

const numRows = 10;
const numCols = 10;
const numMines = 20;

function generateEmptyBoard(): Cell[][] {
  const board: Cell[][] = [];
  for (let i = 0; i < numRows; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < numCols; j++) {
      row.push({ value: 0, state: 'hidden' });
    }
    board.push(row);
  }
  return board;
}

function generateMines(board: Cell[][], numMines: number): void {
  let minesPlaced = 0;
  while (minesPlaced < numMines) {
    const row = Math.floor(Math.random() * numRows);
    const col = Math.floor(Math.random() * numCols);
    if (board[row][col].value !== 'mine') {
      board[row][col].value = 'mine';
      minesPlaced++;
    }
  }
}

// ... 他の関数（countAdjacentMinesやrevealCellなど）をここに実装

const Game: React.FC = () => {
  const [board, setBoard] = useState<Cell[][]>(generateEmptyBoard());

  useEffect(() => {
    const newBoard = generateEmptyBoard();
    generateMines(newBoard, numMines);
    setBoard(newBoard);
  }, []);

  // ... handleCellClickとUIのJSXをここに実装

  return (
    <div className="game">
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
             <div
             key={colIndex}
             className={cell ${cell.state}}
             onClick={() => handleCellClick(rowIndex, colIndex)}
             onContextMenu={(e) => handleContextMenu(e, rowIndex, colIndex)}
           >
             {cell.state === 'visible' && cell.value !== 0 && cell.value !== 'mine' ? cell.value : ''}
             {cell.state === 'flag' ? '🚩' : ''}
           </div>
            ))}
            </div>
        ))}
        </div>
        </div>
  );
           

export default Game;