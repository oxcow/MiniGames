import { createSlice } from '@reduxjs/toolkit'
import Snake from './Snake'

const initialState = {
  snake: {
    direction: null,
    body: [
      [9, 10],//tail
      [10, 10], [11, 10], //body
      [12, 10],//head
    ],
  },
  food: { x: 22, y: 10 },
  timer: null,
  score: 0,
  direction: null,
}

export const snakeGameSlice = createSlice({
  name: 'snakeGame',
  initialState,
  reducers: {
    setSnake: (state, action) => {
      state.snake = { ...state.snake, ...action.payload }
    },
    setFood: state => {
      const x = Math.floor(Math.random() * 30)
      const y = Math.floor(Math.random() * 20)
      state.food = { x, y }
    },
    incScoreBy: (state, action) => {
      state.score += action.payload
    },
    setTimer: (state, action) => {
      if (state.timer) {
        clearInterval(state.timer)
      }
      state.timer = action.payload
    },
    reset: state => {
      state.timer = null
      state.score = 0
      state.food = initialState.food
      state.snake = initialState.snake
    },
  },
})

export const {
  setSnake,
  setFood,
  incScoreBy,
  setTimer,
  reset,
} = snakeGameSlice.actions

export const selectSnake = state => state.snakeGame.snake
export const selectFood = (state) => state.snakeGame.food

export default snakeGameSlice.reducer

export const changeDirection = (code) => (dispatch) => {
  dispatch(setSnake({ direction: code }))
}

const moveAndEat = () => (dispatch, getState) => {
  const snake = selectSnake(getState())
  const snakeClazz = new Snake(snake.body)
  snakeClazz.moving(snake.direction)

  const food = selectFood(getState())

  if (snakeClazz.head[0] === food.x && snakeClazz.head[1] === food.y) {
    const body = [[food.x, food.y], ...snakeClazz.getSnake()]
    dispatch(setSnake({ body }))

    // eaten food
    dispatch(setFood())
    dispatch(incScoreBy(10))
    dispatch(animationFrame())
  } else {
    dispatch(setSnake({ body: snakeClazz.getSnake() }))
  }
}

export const calcSpeed = () => (dispatch, getState) => {
  const score = getState().snakeGame.score
  return 1000 - score * 5
}

export const animationFrame = () => (dispatch, getState) => {
  if (!getState().snakeGame.timer) {
    const timerId = setInterval(() => {
      dispatch(moveAndEat())
    }, dispatch(calcSpeed()))
    dispatch(setTimer(timerId))
  }
}