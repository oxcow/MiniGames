import {useSelector} from "react-redux";

const PreTetris = () => {
  const preTetris = useSelector((state) => state.tetris2.preTetris);
  return (
    <div className="pretetris">
      {
        preTetris.map((row, idx) => (
          <div key={idx}>
            {
              row.map((col, offset) => (
                <span key={offset} className={`${col ? 'bg-dark' : 'bg-gray'}`}></span>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default PreTetris