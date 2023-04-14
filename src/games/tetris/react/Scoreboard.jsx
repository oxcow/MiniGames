import {useSelector} from "react-redux";

const Scoreboard = () => {
  const {score, level} = useSelector((state) => state.tetris2.scoreboard);
  return (
    <div className="scoreboard">
      <div>分数:{score}</div>
      <div>level:{level}</div>
    </div>
  )
}

export default Scoreboard;