const Span = ({ title, className = 'bg-gray' }) => {
  return (<span title={title} className={className}></span>)
}

const Canvas = ({ tetris, px, py }) => {
  const spans = () => {
    let matrix = new Array(20)
    for (let i = 0; i < 20; i++) {
      let rows = new Array(10)
      for (let j = 0; j < 10; j++) {
        rows[j] = <Span key={`${i}_${j}`}/>
      }
      matrix[i] = rows
    }
    if (tetris) {
      const tetrisH = tetris.length
      const showTetris = tetrisH > px
          ? tetris.slice(tetrisH - px - 1)
          : [...tetris]
      //console.log('--->', showTetris)
      for (let r = 0; r < showTetris.length; r++) {
        for (let c = 0; c < showTetris[r].length; c++) {
          if (showTetris[r][c]) {
            matrix[px - (showTetris.length - 1 - r)][c + py] =
                <Span key={`${r + px}_${c + py}`} className="bg-dark"/>
          }
        }
      }
    }
    return matrix
  }

  return (
      <div className="canvas2">
        {
          spans().map((row, idx) => (
              <div key={idx}><span>{idx}:</span> {row.map(col => col)}</div>
          ))
        }
      </div>
  )
}

export const ShowTetris = ({ tetris }) => {
  return (
      <div className="tetris">
        {
          tetris.map((row, idx) => (
              <div key={idx}>
                {
                  row.map((col, offset) => (
                      <span key={offset}
                            className={`${col ? 'bg-dark' : 'bg-gray'}`}></span>
                  ))
                }
              </div>
          ))
        }
      </div>
  )
}

export default Canvas