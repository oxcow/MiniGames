import GameContainer from "../../../components/GameContainer";
import './index.scss';
import {useEffect, useState} from "react";
import Snake, {Point} from "./Snake";

const snake = new Snake(new Point(9, 10), new Point(12, 10), [new Point(10, 10), new Point(11, 10)]);
let _food = new Point(22, 10);

const ReactSnakeGame = () => {
  const [dataMatrix, setDataMatrix] = useState([]);
  const [timer, setTimer] = useState(0);
  const [food, setFood] = useState(_food);

  const eatFood = () => {
    const x = Math.floor(Math.random() * 30);
    const y = Math.floor(Math.random() * 20);
    _food = new Point(x, y);
    setFood(_food);
  }
  const frame = () => {
    const _snake = snake.moveAndEat(_food, eatFood).getSnake();

    const _dataMatrix = [];
    for (let i = 0; i < 20; i++) {
      _dataMatrix.push(new Array(30).fill(0));
    }
    for (const point of _snake) {
      _dataMatrix[point.y][point.x] = 1;
    }
    setDataMatrix(_dataMatrix);
  }

  useEffect(() => {
    const _dataMatrix = [];
    for (let i = 0; i < 20; i++) {
      _dataMatrix.push(new Array(30).fill(0));
    }
    for (const point of snake.getSnake()) {
      _dataMatrix[point.y][point.x] = 1;
    }
    setDataMatrix(_dataMatrix);
  }, []);


  const handleStart = (e) => {
    e.preventDefault();
    const timerId = setInterval(frame, 1000);
    console.log("======> timeId", timerId);
    setTimer(timerId);
  }
  const handleStop = (e) => {
    e.preventDefault();
    clearInterval(timer);
  }

  const handleReset = (e) => {
    e.preventDefault();
    clearInterval(timer);
  }

  document.onkeydown = (e) => {
    e.preventDefault();
    snake.changeDirection(e.code);
  };

  return (
    <GameContainer title="贪吃蛇(React)">
      <div className='column col-12'>
        <button onClick={handleStart} className='btn btn-success'>开始</button>
        <button onClick={handleStop} className='btn btn-error ml-2'>暂停</button>
        <button onClick={handleReset} className='btn btn-link ml-2'>重新开始</button>
      </div>
      <div className='column col-12 border'>
        <div className='canvas'>
          {dataMatrix.map((cols, row) => (
            cols.map((col, idx) => {
              if (row === food.y && idx === food.x) {
                return (
                  <RenderFood key={`${idx + 1}*${row + 1}`} alt={`${row},${idx}`} color={'bg-success'}/>
                )
              } else {
                return (
                  <RenderSnake key={`${idx + 1}*${row + 1}`} alt={`${row},${idx}`} color={col ? 'bg-dark' : ''}/>
                )
              }
            })
          ))}
        </div>
      </div>
    </GameContainer>
  );
}

const RenderSnake = ({color, alt}) => {
  return (
    <div title={alt} className={color}></div>
  )
}
const RenderFood = ({color, alt}) => {
  return (
    <div title={alt} className={color}></div>
  )
}

export default ReactSnakeGame;