import Canvas, { ShowTetris } from './Canvas'
import './tetris2.css'
import Scoreboard from './Scoreboard'
import GameContainer from '../../../components/GameContainer'
import { useDispatch, useSelector } from 'react-redux'
import {
  animationTetris,
  traverseTetris,
  updateScore,
  rotateTetris,
  changeGameStatus,
  getNextTetris,
} from './tetris2Slice'
import { useEffect, useRef } from 'react'

const Tetris2 = () => {

  let timerIdRef = useRef(null)

  const dispatch = useDispatch()

  const nextTetris = useSelector(state => state.tetris2.nextTetris)
  const { px, py, tetris } = useSelector(
      state => state.tetris2.currentTetris)
  const { score, level } = useSelector((state) => state.tetris2.scoreboard)

  const handleShowNextTetris = () => dispatch(getNextTetris())
  const handleChangeScore = () => dispatch(updateScore(200))
  const handleMoveTetris = () => dispatch(animationTetris())

  const handleStart = () => {
    timerIdRef.current = dispatch(changeGameStatus('start'))
  }
  const handleStop = () => clearInterval(timerIdRef.current)
  const handleReset = () => dispatch(changeGameStatus('reset'))

  useEffect(() => {
    const handleKeydownEvent = event => {
      event.preventDefault()
      switch (event.code) {
        case 'KeyS':
        case 'ArrowDown':
          console.log('press s or down')
          break
        case 'KeyW':
        case 'ArrowUp':
          dispatch(rotateTetris())
          break
        case 'KeyA':
        case 'ArrowLeft':
          dispatch(traverseTetris(-1))
          break
        case 'KeyD':
        case 'ArrowRight':
          dispatch(traverseTetris(1))
          break
        default:
          console.debug('do nothing')
      }
    }
    const handleKeyupEvent = event => {
      if (['KeyS', 'ArrowDown'].includes(event.code)) {
        console.log('unpress s or down')
      }
    }
    window.addEventListener('keydown', handleKeydownEvent)
    window.addEventListener('keyup', handleKeyupEvent)
    return () => {
      window.removeEventListener('keydown', handleKeydownEvent)
      window.removeEventListener('keyup', handleKeyupEvent)
    }
  }, [dispatch])

  return (
      <GameContainer title="Tetris Game V2">
        <div>
          <button onClick={handleStart}>Start</button>
          <button onClick={handleStop}>Stop</button>
          <button onClick={handleReset}>Reset</button>
        </div>
        <button onClick={handleShowNextTetris}>Next Tetris</button>
        <button onClick={handleChangeScore}>Change Score</button>
        <button onClick={handleMoveTetris}>Move Tetris</button>
        <button onClick={handleStop}>Stop Move</button>
        <Scoreboard score={score} level={level}/>
        <ShowTetris tetris={nextTetris}/>
        <Canvas tetris={tetris} px={px} py={py}/>
      </GameContainer>
  )
}

export default Tetris2