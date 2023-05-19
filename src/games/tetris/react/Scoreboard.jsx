const Scoreboard = ({score,level}) => {
  return (
    <div className="scoreboard">
      <div>分数:{score}</div>
      <div>level:{level}</div>
    </div>
  )
}

export default Scoreboard;