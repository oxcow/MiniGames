import Canvas from "./Canvas";
import './tetris2.css'
import Scoreboard from "./Scoreboard";
import PreTetris from "./PreTetris";
import GameContainer from "../../../components/GameContainer";
import {useDispatch, useSelector} from "react-redux";
import {animationTetris, nextTetris, updateScore, updateTimer} from "./tetris2Slice";

const Tetris2 = () => {
  const dispatch = useDispatch();

  const timerId = useSelector((state) => state.tetris2.timerId);

  const showNextTetris = (e) => {
    e.preventDefault();
    dispatch(nextTetris());
  }
  const changeScore = (e) => {
    e.preventDefault();
    dispatch(updateScore({score: 200}));
  }
  const moveTetris = (e) => {
    e.preventDefault();
    dispatch(animationTetris());
  }
  const stop = (e) => {
    e.preventDefault();
    clearInterval(timerId);
    dispatch(updateTimer(0));
  }
  return (
    <GameContainer title="Tetris Game V2">
      <button onClick={showNextTetris}>Next Tetris</button>
      <button onClick={changeScore}>Change Score</button>
      <button onClick={moveTetris}>Move Tetris</button>
      <button onClick={stop}>Stop Move</button>
      <Scoreboard/>
      <PreTetris/>
      <Canvas/>
    </GameContainer>

  )
}

export default Tetris2;