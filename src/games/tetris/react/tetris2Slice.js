import {createSlice} from "@reduxjs/toolkit";

const initDataMatrix = () => {
  let matrix = new Array(20);
  for (let i = 0; i < 20; i++) {
    matrix[i] = new Array(10).fill(0);
  }
  return matrix;
}

const initTetrisStatus = () => {
  return {
    px: 0,
    py: 3,
    tetris: [],
  }
}

const defaultTetris = () => {
  const tMap = new Map();
  tMap.set("T", [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ]);
  tMap.set("I", [
    [1],
    [1],
    [1],
    [1],
  ]);
  tMap.set("S", [
    [0, 1, 1],
    [1, 1, 0],
  ]);
  tMap.set("Z", [
    [1, 1, 0],
    [0, 1, 1],
  ]);
  tMap.set("O", [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ]);
  tMap.set("L", [
    [1, 0],
    [1, 0],
    [1, 1],
  ]);
  return tMap
}
const randomTetris = () => {
  const allTetris = defaultTetris();
  const i = Math.floor((Math.random() * allTetris.size));
  return Array.from(allTetris, ([name, value]) => ({value}))[i].value;
}

export const tetris2Slice = createSlice({
  name: 'tetris2',
  initialState: {
    dataMatrix: initDataMatrix(),
    scoreboard: {
      score: 0,
      level: 1,
    },
    preTetris: randomTetris(),
    tetrisStatus: initTetrisStatus(),
    timerId: 0,
  },
  reducers: {
    updateScore: (state, {payload}) => {
      state.scoreboard.score += payload.score;
      state.scoreboard.level = state.scoreboard.score / 100;
    },
    nextTetris: (state) => {
      state.preTetris = randomTetris();
    },
    updateDataMatrix: (state, action) => {
      state.dataMatrix = action.payload;
    },
    updateTetrisStatus: (state, action) => {
      state.tetrisStatus = action.payload;
    },
    updateTimer: (state, action) => {
      state.timerId = action.payload;
    }
  }
});

export const {updateScore, updateDataMatrix, updateTetrisStatus, updateTimer, nextTetris} = tetris2Slice.actions;

export const animationTetris = () => (dispatch, getState) => {
  const timerId = setInterval(() => {

    let {px, py, tetris} = getState().tetris2.tetrisStatus;

    if (tetris.length === 0) {
      tetris = getState().tetris2.preTetris;
    }

    let canvas = initDataMatrix();
    for (let r = 0; r < tetris.length; r++) {
      const row = tetris[r];
      for (let c = 0; c < row.length; c++) {
        canvas[px + r][py + c] = tetris[r][c];
      }
    }
    dispatch(updateDataMatrix(canvas));

    //TODO: 根据方向决定
    // 到底了
    if (px + tetris.length > 19) {
      clearInterval(getState().tetris2.timerId);
      dispatch(updateTimer(0));
      dispatch(updateTetrisStatus(initTetrisStatus()));
      dispatch(nextTetris());
      dispatch(animationTetris());
    } else {
      px += 1;
      dispatch(updateTetrisStatus({px, py, tetris}));
    }
  }, 800);
  dispatch(updateTimer(timerId));
}

export default tetris2Slice.reducer;