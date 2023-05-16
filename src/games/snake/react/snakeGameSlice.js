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
  status: 'init',
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
    setStatus: (state, action) => {
      state.status = action.payload
    },
  },
})

export const {
  setSnake,
  setFood,
  incScoreBy,
  setTimer,
  reset,
  setStatus,
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

  if (snakeClazz.head[0] < 0 || snakeClazz.head[0] >= 30
      || snakeClazz.head[1] < 0 || snakeClazz.head[1] >= 20) {
    console.log('game over')
    dispatch(changeGameStatus('GameOver'))
    return
  }

  if (snakeClazz.body.find(
      n => n[0] === snakeClazz.head[0] && n[1] === snakeClazz.head[1])) {
    console.log('eat self')
    dispatch(changeGameStatus('GameOver-EatSelf'))
    return
  }

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

const animationFrame = () => (dispatch, getState) => {
  if (!getState().snakeGame.timer) {
    const timerId = setInterval(() => {
      dispatch(moveAndEat())
    }, dispatch(calcSpeed()))
    dispatch(setTimer(timerId))
  }
}

export const changeGameStatus = (status) => (dispatch, getState) => {
  if (getState().snakeGame.status === status) {
    return
  }
  if (status === 'start') {
    dispatch(animationFrame())
  } else if (status === 'stop') {
    dispatch(setTimer(null))
  } else if (status === 'GameOver' || status === 'GameOver-EatSelf') {
    dispatch(setTimer(null))
  } else {
    dispatch(setTimer(null))
    dispatch(reset())
  }
  dispatch(setStatus(status))
}