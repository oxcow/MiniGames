import { createSlice } from '@reduxjs/toolkit'
import Snake, { Point } from './Snake'

const initialState = {
  dataMatrix: [],
  timer: null,
  snake: new Snake(new Point(9, 10), new Point(12, 10),
      [new Point(10, 10), new Point(11, 10)]),
  food: new Point(22, 10),
  score: 0,
}
export const snakeGameSlice = createSlice({
  name: 'snakeGame',
  initialState,
  reducers: {
    newFood: state => {
      const x = Math.floor(Math.random() * 30)
      const y = Math.floor(Math.random() * 20)
      state.food = new Point(x, y)
    },
    changeScore: (state, action) => {
      state.score = action.payload
    },
    setTimer: (state, action) => {
      state.timer = action.payload
    },
    changeDirection: (state, action) => {
      state.snake.changeDirection(action.payload)
    },
    renderGame: (state) => {
      const _dataMatrix = []
      for (let i = 0; i < 20; i++) {
        _dataMatrix.push(new Array(30).fill(0))
      }
      for (const point of state.snake.getSnake()) {
        _dataMatrix[point.y][point.x] = 1
      }
      state.dataMatrix = _dataMatrix
    },
    reset: state => {
      state.food = initialState.food
      state.snake = initialState.snake
    },
  },
})

export const {
  newFood,
  changeScore,
  renderGame,
  setTimer,
  reset,
  changeDirection,
} = snakeGameSlice.actions

export const selectDataMatrix = (state) => state.snakeGame.dataMatrix
export const selectFood = (state) => state.snakeGame.food
const selectSnake = state => state.snakeGame.snake

export default snakeGameSlice.reducer

export const calcSpeed = (score) => {
  return 1000 - score * 5
}

const moveAndEat = () => (dispatch, getState) => {
  const [_snake, eaten] = selectSnake(getState()).moveAndEat(selectFood(getState()))

  if (eaten) {
    dispatch(newFood())
    const score = getState().snakeGame.score + 10
    dispatch(changeScore(score))
    clearInterval(getState().snakeGame.timer)
    dispatch(
        setTimer(
            setInterval(() => {
              dispatch(moveAndEat())
              dispatch(renderGame())
            }, calcSpeed(score)),
        ),
    )
  }
}

export const animationFrame = () => (dispatch, getState) => {
  if (!getState().snakeGame.timer) {
    const timerId = setInterval(() => {
      dispatch(moveAndEat())
      dispatch(renderGame())
    }, 1000)
    dispatch(setTimer(timerId))
  }
}