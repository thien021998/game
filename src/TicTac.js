import React, { Component } from 'react';

class TicTac extends Component {
  constructor(props){
    super(props);
    this.state = {
      history : [{
        square : Array(9).fill(null),
      }],
      xIsNext : true,
      stepNumber : 0,
    }
  }
  handleClick(i){
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const curent = history[history.length -1]
    const square = curent.square.slice();
    if (calculateWinner(square) || square[i]){
      return
    }
    square[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history : history.concat([{
        square : square,
      }]),
      stepNumber : history.length,
      xIsNext : !this.state.xIsNext
    })
  }
  jumpTo(step){
    this.setState({
      stepNumber : step,
      xIsNext : (step % 2) === 0
    })
  }
  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.square)
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status
    if(winner){
      status = 'Winner' + winner
    } else (
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' :'O')
    )

    return (
      <div className="game">
        <div className = "game-board">
          <Board
            square = {current.square}
            onClick = {(i) => this.handleClick(i) }
          />
        </div>
        <div className = "game-info">
          <div>{status}</div>
          <div>{moves}</div>
        </div>
      </div>
    );
  }
}

class Board extends React.Component{



  renderSquare(i){
    return <Square value = {this.props.square[i]} onClick = {() => this.props.onClick(i)}/>
  }
  render(){
    return (
      <div>
        <div className = "board-row">
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className = "board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
        </div>
        <div className = "board-row">
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
        </div>
      </div>
    )
  }
}

function Square(props){
  return (
    <button className = "square" onClick = {props.onClick}>
      {props.value}
    </button>
  )
}

function calculateWinner(square){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [1,4,8],
    [2,4,6]
  ];
  for(let i = 0; i<lines.length; i++){
    const [a,b,c] = lines[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a]
    }
    return null
  }
}

export default TicTac;
