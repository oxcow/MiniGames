import React, { useEffect } from 'react'
import './index.css'
import TetrisGame from './TetrisGame'
import GameContainer from '../../components/GameContainer'

export default function TetrisGames () {

  useEffect(() => {

    const oTetrisGame = new TetrisGame()
    oTetrisGame.preload()

    const handleKeyboardEvents = e => oTetrisGame.keyboardEventsListeners(e)

    window.addEventListener('keydown', handleKeyboardEvents)

    document.getElementById('start').onclick = function () {
      oTetrisGame.start()
    }
    document.getElementById('stop').onclick = function () {
      oTetrisGame.stop()
    }
    document.getElementById('restart').onclick = function () {
      oTetrisGame.reset()
    }

    return () => {
      window.removeEventListener('keydown', handleKeyboardEvents)
      oTetrisGame.erase()
    }
  }, [])

  return (
    <GameContainer title="纯JS实现俄罗斯方块">
      <div id="TetrisGame">
        <div id="canvas"></div>
        <div id="controlPanel">
          <div id="preCanvas"></div>
          <div id="control">
            <label>分数：<span id="score"></span></label>
            <label>等级：<span id="level"></span></label>
            <button id="start">start</button>
            <button id="stop">stop</button>
            <button id="restart">restart</button>
          </div>
        </div>
        <textarea rows="2" cols="40" id="debug"></textarea>
      </div>
    </GameContainer>
  )
}