import React from "react";
import Utils from "../../classes/Utils";
import GameContainer from '../../components/GameContainer';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  render() {
    const puzzles = this.props.puzzles;
    return (
      <div>
        {puzzles.map((v, k) => {
          return (
            <span key={k}>
              <Square value={v} onClick={() => this.props.onClick(k, v)}/>
            </span>
          );
        })}
      </div>
    );
  }
}

class PuzzleGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialization(3);
  }

  initialization(matrixN) {
    return {
      stepNumber: 0,
      solved: false,
      matrixN: matrixN,
      history: [
        {
          puzzles: Utils.getSolvablePuzzleNumbers(matrixN),
          nullIndex: matrixN * matrixN - 1,
        },
      ],
    }
  }

  changeMatrix(matrixN) {
    if (matrixN !== this.state.matrixN) {
      this.setState(this.initialization(matrixN));
    }
  }

  getOffset(index) {
    const row = Math.floor(index / this.state.matrixN);
    const col = index % this.state.matrixN;
    return {R: row, C: col};
  }

  canExchange(nullIndex, clickIndex) {
    const nullOffset = this.getOffset(nullIndex);
    const clickOffset = this.getOffset(clickIndex);
    return (nullOffset.R === clickOffset.R && Math.abs(nullOffset.C - clickOffset.C) === 1) ? true :
      (nullOffset.C === clickOffset.C && Math.abs(nullOffset.R - clickOffset.R) === 1);
  }

  doExchange(puzzles, k, v, nullIndex) {
    puzzles[nullIndex] = v;
    puzzles[k] = null;
    return puzzles;
  }

  isSolved(puzzles) {
    if (puzzles.includes(null, -1)) {
      let isSolved = true;
      let baseNumber = puzzles[0];
      for (let i = 1; i < puzzles.length - 1; i++) {
        if (puzzles[i] - baseNumber !== 1) {
          isSolved = false;
          break;
        } else {
          baseNumber = puzzles[i];
        }
      }
      return isSolved;
    }
    return false;
  }

  handleClick(k, v) {
    let isSolved = this.state.solved;
    if (isSolved || v === null) {
      return;
    }

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const currentNullIndex = current.nullIndex;

    if (!this.canExchange(currentNullIndex, k)) {
      return;
    }

    const puzzles = this.doExchange(current.puzzles.slice(), k, v, currentNullIndex);

    isSolved = this.isSolved(puzzles);

    this.setState({
      history: history.concat([{puzzles: puzzles, nullIndex: k,}]),
      stepNumber: history.length,
      solved: isSolved,
    });
  }

  jumpTo = step => {
    const isSolved = this.state.solved;
    if (!isSolved) {
      this.setState({
        stepNumber: step,
      });
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const isSolved = this.state.solved;
    const message = {
      solved: isSolved,
      message: 'Congratulations!',
      handleCloseEvent: () => {
        this.setState(this.initialization());
      }
    }

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            onTouchEnd={() => this.jumpTo(move)}
          >
            {desc} - {step.puzzles.join(",")}
          </button>
        </li>
      );
    });

    return (
      <GameContainer title="数字华容道" jumpTo={moves} message={message}>
        <div className="form-group">
          <label className="form-label form-inline col-sm-2 col-2">选择难度</label>
          {
            [3, 4, 5].map((ele, index) => {
              const checked = this.state.matrixN === ele ? 'checked' : '';
              return (
                <label className="form-radio form-inline" key={index}>
                  <input type="radio" name="matrixN" checked={checked} onChange={() => this.changeMatrix(ele)}/>
                  <i className="form-icon"></i> {ele}
                </label>
              )
            })
          }
        </div>
        <div className="puzzle-game">
          <div className="puzzle-game-board" style={{width: this.state.matrixN * 100}}>
            <Board
              puzzles={current.puzzles}
              onClick={(k, v) => this.handleClick(k, v)}
            />
          </div>
        </div>
      </GameContainer>
    );
  }
}

export default PuzzleGame;