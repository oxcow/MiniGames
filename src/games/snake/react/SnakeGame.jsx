import GameContainer from '../../../components/GameContainer'
import './index.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  renderGame,
  selectDataMatrix,
  selectFood,
  changeDirection,
  animationFrame,
  setTimer,
  reset,
  calcSpeed,
} from './snakeGameSlice'

const ReactSnakeGame = () => {

  const dataMatrix = useSelector(selectDataMatrix)
  const food = useSelector(selectFood)
  const timer = useSelector(state => state.snakeGame.timer)
  const score = useSelector(state => state.snakeGame.score)

  const speed = calcSpeed(score)

  const dispatch = useDispatch()

  const handleStart = (e) => {
    e.preventDefault()
    dispatch(animationFrame())
  }

  const handleStop = (e) => {
    e.preventDefault()
    if (timer) {
      clearInterval(timer)
    }
    dispatch(setTimer(null))
  }

  const handleReset = e => {
    e.preventDefault()
    if (timer) {
      clearInterval(timer)
    }
    dispatch(reset())
    dispatch(renderGame())
  }

  useEffect(() => {
    const handleKeydownEvent = e => dispatch(changeDirection(e.code))
    window.addEventListener('keydown', handleKeydownEvent)
    dispatch(renderGame())
    return () => {
      window.removeEventListener('keydown', handleKeydownEvent)
      dispatch(reset())
      dispatch(renderGame())
    }
  }, [dispatch])

  return (
      <GameContainer title="贪吃蛇(React)">
        <div className="column col-12">
          <button onClick={handleStart} className="btn btn-success">开始</button>
          <button onClick={handleStop} className="btn btn-error ml-2">暂停
          </button>
          <button onClick={handleReset} className="btn btn-link ml-2">重新开始
          </button>
          <div><b>Score:</b>{score}</div>
          <div><b>Speed:</b>{speed}</div>
        </div>
        <div className="column col-12 border">
          <div className="canvas">
            {dataMatrix.map((cols, row) => (
                cols.map((col, idx) => {
                  if (row === food.y && idx === food.x) {
                    return (
                        <RenderFood key={`${idx + 1}*${row + 1}`}
                                    alt={`${row},${idx}`} color={'bg-success'}/>
                    )
                  } else {
                    return (
                        <RenderSnake key={`${idx + 1}*${row + 1}`}
                                     alt={`${row},${idx}`}
                                     color={col ? 'bg-dark' : ''}/>
                    )
                  }
                })
            ))}
          </div>
        </div>
      </GameContainer>
  )
}

const RenderSnake = ({ color, alt }) => {
  return (
      <div title={alt} className={color}></div>
  )
}
const RenderFood = ({ color, alt }) => {
  return (
      <div title={alt} className={color}></div>
  )
}

export default ReactSnakeGame