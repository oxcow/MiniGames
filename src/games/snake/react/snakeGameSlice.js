import {createSlice} from "@reduxjs/toolkit";
import Snake, {Point} from "./Snake";

const initialState = {
  dataMatrix: [],
  timer: 0,
  snake: new Snake(new Point(9, 10), new Point(12, 10), [new Point(10, 10), new Point(11, 10)]),
  food: new Point(22, 10),
}
export const snakeGameSlice = createSlice({
  name: 'snakeGame',
  initialState,
  reducers: {
    moveAndEat: (state) => {
      const [_snake, eaten] = state.snake.moveAndEat(state.food);
      if (eaten) {
        const x = Math.floor(Math.random() * 30);
        const y = Math.floor(Math.random() * 20);
        state.food = new Point(x, y);
      }
      state.snake = _snake;
    },
    start: (state, action) => {
      state.timer = action.payload;
    },
    stop: (state) => {
      clearInterval(state.timer);
      state.timer = 0;
    },
    directController: (state, action) => {
      state.snake.changeDirection(action.payload)
    },
    renderGame: (state) => {
      const _dataMatrix = [];
      for (let i = 0; i < 20; i++) {
        _dataMatrix.push(new Array(30).fill(0));
      }
      for (const point of state.snake.getSnake()) {
        _dataMatrix[point.y][point.x] = 1;
      }
      state.dataMatrix = _dataMatrix;
    }
  }
});

export const {moveAndEat, renderGame, start, stop, directController} = snakeGameSlice.actions

export const selectDataMatrix = (state) => state.snakeGame.dataMatrix;
export const selectFood = (state) => state.snakeGame.food;

export default snakeGameSlice.reducer;