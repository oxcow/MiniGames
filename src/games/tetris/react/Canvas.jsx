import {useSelector} from "react-redux";

const Canvas = () => {
  const dataMatrix = useSelector((state) => state.tetris2.dataMatrix);
  return (
    <div  className={`canvas2`}>
      {
        dataMatrix.map((row, idx) => (
          <div key={idx}>
            {
              row.map((col, offset) => (
                <span key={offset} title={`${idx}-${offset}`} className={`${col ? 'bg-dark' : 'bg-gray'}`}></span>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default Canvas;