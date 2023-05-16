import GameContainer from '../../../components/GameContainer'
import './index.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectSnake,
  selectFood,
  changeDirection,
  calcSpeed,
  changeGameStatus,
} from './snakeGameSlice'

const ReactSnakeGame = () => {

  const snake = useSelector(selectSnake)
  const food = useSelector(selectFood)
  const score = useSelector(state => state.snakeGame.score)
  const gamsStatus = useSelector(state => state.snakeGame.status)

  const dispatch = useDispatch()

  const handleStart = () => dispatch(changeGameStatus('start'))
  const handleStop = () => dispatch(changeGameStatus('stop'))
  const handleReset = () => dispatch(changeGameStatus('reset'))

  useEffect(() => {
    const handleKeydownEvent = e => dispatch(changeDirection(e.code))
    window.addEventListener('keydown', handleKeydownEvent)
    return () => {
      window.removeEventListener('keydown', handleKeydownEvent)
      dispatch(changeGameStatus('init'))
    }
  }, [dispatch])

  const canvasPixels = () => {
    let _dataMatrix = []
    for (let i = 0; i < 20; i++) {
      let cols = []
      for (let j = 0; j < 30; j++) {
        cols.push(<Pixel key={`${i}_${j}`}/>)
      }
      _dataMatrix.push(cols)
    }
    for (const point of snake.body) {
      _dataMatrix[point[1]][point[0]] =
          <Pixel key={`${point[0]}_${point[1]}`} className="snake" alt="snake"/>
    }
    _dataMatrix[food.y][food.x] =
        <Pixel key={`${food.x}_${food.y}`} className="food" alt="food"/>

    return _dataMatrix
  }

  return (
      <GameContainer title="Snake (React)">
        <h5>Game Status: {gamsStatus}</h5>
        <div className="column col-12">
          <button onClick={handleStart} className="btn btn-success">开始</button>
          <button onClick={handleStop} className="btn btn-error ml-2">暂停
          </button>
          <button onClick={handleReset} className="btn btn-link ml-2">重新开始
          </button>
          <Scoreboard score={score} speed={dispatch(calcSpeed())}/>
        </div>
        <div className="column col-12 border">
          <div className="canvas">
            {canvasPixels().map(cols => (cols.map(col => col)))}
          </div>
        </div>
      </GameContainer>
  )
}

const Pixel = ({ className = '', alt = 'block' }) => {
  return <div title={alt} className={className}></div>
}

const Scoreboard = ({ score, speed }) => {
  return (
      <div>
        <div><b>Score:</b>{score}</div>
        <div><b>Speed:</b>{speed}</div>
      </div>
  )
}

export default ReactSnakeGame