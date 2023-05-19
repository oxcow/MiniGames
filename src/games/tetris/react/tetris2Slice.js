import { createSlice } from '@reduxjs/toolkit'

const defaultTetris = () => {
  const tMap = new Map()
  tMap.set('T', [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ])
  tMap.set('I', [
    [1],
    [1],
    [1],
    [1],
  ])
  tMap.set('S', [
    [0, 1, 1],
    [1, 1, 0],
  ])
  tMap.set('Z', [
    [1, 1, 0],
    [0, 1, 1],
  ])
  tMap.set('O', [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ])
  tMap.set('L', [
    [1, 0],
    [1, 0],
    [1, 1],
  ])
  return tMap
}

const randomTetris = () => {
  const allTetris = defaultTetris()
  const i = Math.floor((Math.random() * allTetris.size))
  return Array.from(allTetris, ([name, value]) => ({ value }))[i].value
}

export const tetris2Slice = createSlice({
  name: 'tetris2',
  status: 'init',
  initialState: {
    scoreboard: {
      score: 0,
      level: 1,
    },
    nextTetris: randomTetris(),
    currentTetris: {
      px: 0,
      py: 3,
      tetris: null,
    },
  },

  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
    updateScore: (state, action) => {
      state.scoreboard.score += action.payload
      state.scoreboard.level = state.scoreboard.score / 100
    },
    getNextTetris: (state) => {
      state.nextTetris = randomTetris()
    },
    rotateTetris: (state) => {
      const { px, py, tetris } = state.currentTetris
      const m = tetris.length
      const n = tetris[0].length
      let newTetris = []
      for (let r = 0; r < n; r++) {
        let row = []
        for (let c = 0; c < m; c++) {
          row.push(0)
        }
        newTetris.push(row)
      }
      for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
          newTetris[c][m - r - 1] = tetris[r][c]
          console.debug('(', r, ',', c, ') ==> ', '(', c, ',', (m - r - 1), ')')
        }
      }
      state.currentTetris.tetris = newTetris
      // 靠右边旋转时调整位置
      state.currentTetris.py = py + m > 10 ? 10 - m : py
    },
    setCurrentTetris: (state, action) => {
      state.currentTetris = action.payload
    },
  },
})

export const {
  setStatus,
  updateScore,
  getNextTetris,
  rotateTetris,
  setCurrentTetris,
} = tetris2Slice.actions

export default tetris2Slice.reducer

export const animationTetris = () => (dispatch, getState) => {
  return setInterval(() => {
    let { px, py, tetris } = getState().tetris2.currentTetris
    if (!tetris) {
      tetris = getState().tetris2.nextTetris
    }
    px += 1
    if (px >= 20) {
      dispatch(getNextTetris())
      dispatch(setCurrentTetris({ px: 0, py: 3, tetris: null }))
    } else {
      dispatch(setCurrentTetris({ px, py, tetris }))
    }
  }, 1000)
}

export const traverseTetris = (offset) => (dispatch, getState) => {
  let { px, py, tetris } = getState().tetris2.currentTetris
  py += offset
  if (py < 0 || py > 10 - tetris[0].length) {
    return
  }
  dispatch(setCurrentTetris({ px, py, tetris }))
}

export const changeGameStatus = (status) => (dispatch, getState) => {
  if (getState().tetris2.status === status) {
    return
  }
  if (status === 'start') {
    return dispatch(animationTetris())
  } else if (status === 'stop') {
    // dispatch(setTimer(null))
  } else if (status === 'GameOver' || status === 'GameOver-EatSelf') {
    //dispatch(setTimer(null))
  } else {
    // dispatch(setTimer(null))
    // dispatch(reset())
  }
  dispatch(setStatus(status))
}