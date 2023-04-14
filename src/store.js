import {configureStore} from "@reduxjs/toolkit";
import snakeGameReducer from "./games/snake/react/snakeGameSlice";
import todoReducer from "./games/todo/todoSlice";
import tetris2Reducer from "./games/tetris/react/tetris2Slice";

export const store = configureStore({
  reducer: {
    snakeGame: snakeGameReducer,
    tetris2: tetris2Reducer,
  }
})