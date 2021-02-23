import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

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
      return squares[a];
    }
  }
  return null;
}

const Square = (props) => {
  return (< button className="square" onClick={() => props.onClick()}>
    { props.value}
  </button >
  )
};

const Board = (props) => {
  const renderSquare = (i) => {
    return <Square value={props.squares[i]}
      onClick={() => props.onClick(i)}
    />;
  }
  return (
    <div>
      <div className="status">{props.status}</div>
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
const Game = () => {
  let [history, setHistory] = useState([{
    squares: Array(9).fill(null)
  }])
  let [stepNumber, setStepNumber] = useState(0);
  let [xIsNext, setXIsNext] = useState(true)

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move # ${move}` : `Go to Start`;
    const jumpTo = (step) => {
      setStepNumber(step);
      setXIsNext((step % 2) === 0);
    }
    return (<li key={move}>
      <button onClick={() => jumpTo(move)}>{desc}</button>
    </li>)
  })

  let status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;
  const handleClick = (i) => {
    // console.log(i, stepNumber, history.slice(0, stepNumber + 1))

    let h = history.slice(0, stepNumber + 1);
    let current = h[h.length - 1];
    let squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(h.concat([{
      squares: squares,
    }]));
    setXIsNext(!xIsNext);
    setStepNumber(h.length);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
