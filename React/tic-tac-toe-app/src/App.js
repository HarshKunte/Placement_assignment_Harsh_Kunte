import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(9).fill(''),
      currentPlayer: 'X',
      winner: '',
    };
  }

  handleCellClick(index) {
    if (this.state.board[index] === '' && !this.state.winner) {
      const newBoard = [...this.state.board];
      newBoard[index] = this.state.currentPlayer;

      this.setState(
        {
          board: newBoard,
          currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X',
        },
        () => {
          this.checkWinner();
        }
      );
    }
  }

  checkWinner() {
    const { board } = this.state;
    const winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningPositions.length; i++) {
      const [a, b, c] = winningPositions[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        this.setState({ winner: board[a] });
        break;
      }
    }
  }

  handleReset() {
    this.setState({
      board: Array(9).fill(''),
      currentPlayer: 'X',
      winner: '',
    });
  }

  render() {
    const { board, currentPlayer, winner } = this.state;

    return (
      <div className="tic-tac-toe">
        <h1>Tic Tac Toe</h1>
        <div className="board">
          {board.map((cell, index) => (
            <div
              key={index}
              className={`cell ${cell}`}
              onClick={() => this.handleCellClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>
        {winner && (
          <div className="winner">
            <p>{`Player ${winner} wins!`}</p>
            <button onClick={() => this.handleReset()}>Play Again</button>
          </div>
        )}
        {!winner && board.every((cell) => cell !== '') && (
          <div className="draw">
            <p>It's a draw!</p>
            <button onClick={() => this.handleReset()}>Play Again</button>
          </div>
        )}
        <div className="current-player">
          <p>{`Current Player: ${currentPlayer}`}</p>
        </div>
      </div>
    );
  }
}

export default App;
