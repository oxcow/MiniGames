import { useEffect, useState } from 'react';
import GameContainer from '../../components/GameContainer';
import { Constant, Snake, SnakeGame as _SnakeGame } from './snake';
import './index.css';

const SnakeGame = () => {
  const [snakeGame, setSankeGame] = useState(null);
  const handleStart = (e) => {
    snakeGame.start();
  };
  const handleStop = (e) => {
    snakeGame.stop();
  };
  const handleRestart = (e) => {
    snakeGame.restart();
  }

  document.onkeydown = (e) => {
    e.preventDefault();
    if (e.which > 36 && e.which < 41 && Math.abs(Snake.direction - e.which) != 2) {
      Snake.direction = e.which;
    }
    if (e.code == 'Space') {
      snakeGame.stop();
    }
  }

  useEffect(() => {
    const game = _SnakeGame;
    setSankeGame(game);
  }, []);

  return (
    <GameContainer title='贪吃蛇(H5 Canvas)'>
      <div className='columns'>
        <div className='column col-12'>
          <button onClick={handleStart} className='btn btn-success'>start</button>
          <button onClick={handleStop} className='btn btn-error ml-2'>stop</button>
          <button onClick={handleRestart} className='btn btn-link ml-2'>restart</button>
        </div>
        <div className='column col-12 border'>
          <canvas id={Constant.CANVAS_ID} width={600} height={400}></canvas>
        </div>
      </div>

    </GameContainer>
  );
}

export default SnakeGame;