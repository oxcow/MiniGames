import GameContainer from "../../../components/GameContainer";
import './index.scss';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  moveAndEat,
  renderGame,
  selectDataMatrix,
  selectFood, start, stop, directController,
} from "./snakeGameSlice";

const ReactSnakeGame = () => {

  const dataMatrix = useSelector(selectDataMatrix);
  const food = useSelector(selectFood);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(renderGame());
  }, [dispatch]);

  const frame = () => {
    dispatch(moveAndEat());
    dispatch(renderGame());
  }

  const handleStart = (e) => {
    e.preventDefault();
    const timerId = setInterval(frame, 1000);
    dispatch(start(timerId))
  }

  const handleStop = (e) => {
    e.preventDefault();
    dispatch(stop());
  }

  const handleReset = (e) => {
    e.preventDefault();
    dispatch(stop());
  }

  document.onkeydown = (e) => {
    e.preventDefault();
    dispatch(directController(e.code))
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