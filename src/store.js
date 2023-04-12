import {configureStore} from "@reduxjs/toolkit";
import snakeGameReducer from "./games/snake/react/snakeGameSlice";

export const store = configureStore({
  reducer: {
    snakeGame: snakeGameReducer,
  }
})