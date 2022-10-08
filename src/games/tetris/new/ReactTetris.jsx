import GameContainer from "../../../components/GameContainer";
import Canvas from "./Canvas";
import './tetris.scss'

const ReactTetris = () => {
  return (
    <GameContainer title='React 俄罗斯方块'>
      <div className="card">
        <div className="card-body">
          <Canvas />
        </div>
      </div>
    </GameContainer>

  )
}

export default ReactTetris;