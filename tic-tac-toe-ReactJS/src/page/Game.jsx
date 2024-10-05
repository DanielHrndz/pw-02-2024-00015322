import React, { useState } from "react";

function Square({ value, onClick, highlight }) {
  return (
    <button
      className={`square ${highlight ? "highlight" : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function Board({ squares, onClick, winningSquares }) {
  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        highlight={winningSquares.includes(i)}
      />
    );
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningSquares = winnerInfo ? winnerInfo.line : [];

  const handleClick = (i) => {
    if (winner || squares[i]) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const isDraw = !winner && squares.every((square) => square !== null);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          onClick={handleClick}
          winningSquares={winningSquares}
        />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <button className="reset-btn" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}

export default Game;
