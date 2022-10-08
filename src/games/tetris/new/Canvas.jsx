import { useEffect, useRef, useState } from "react";
import useInterval from "../../../hooks/hooks";
import { Point, TetrisI, TetrisJ, TetrisL, TetrisO, TetrisS, TetrisZ } from "./test";

const initDataMatrix = () => {
  const _dataMatrix = [];
  for (let i = 19; i >= 0; i--) {
    _dataMatrix.push(new Array(10).fill(0));
  }
  console.log(_dataMatrix);
  return _dataMatrix;
}
const Canvas = (props) => {
  const [isStart, setStart] = useState(false);
  const [refPoint, setRefPoint] = useState(new Point(3, 19));
  const [dataMatrix, updateDataMatrix] = useState(() => initDataMatrix());
  const [tileCoords, setCurrentTileCoords] = useState(null);
  const [timerId, setTimerId] = useState(null);
  const [tetris, setCurrentTetris] = useState(() => new TetrisL());

  const move = () => {
    if (!tetris) {
      return;
    }

    const _matrix = [...dataMatrix];

    const oldTileCoords = tetris.coordinate(refPoint);
    for (const ties of oldTileCoords) {
      if (ties.y < 20 && ties.x > -1 && ties.x < 10) {
        _matrix[19 - ties.y][ties.x] = 0;
      }
    }
    const newPoint = new Point(refPoint.x, refPoint.y - 1);
    const newTileCoords = tetris.coordinate(newPoint);
    for (const ties of newTileCoords) {
      if (ties.y < 20 && ties.x > -1 && ties.x < 10) {
        _matrix[19 - ties.y][ties.x] = ties.v;
      }
    }

    setRefPoint(newPoint);
    setCurrentTileCoords(() => newTileCoords);

    updateDataMatrix(() => _matrix);

  }

  // const id = useInterval(()=>{
  //   move();
  // },1000);
  // setTimerId(id);

  // useEffect(()=>{
    
  // },[]);

  useEffect(() => {
    if (isStart) {
      move();
    } else {
      if (timerId) {
        clearTimeout(timerId);
        setTimerId(null);
      }
    }

  }, [isStart]);

  const handlerStart = (e) => {
    setStart(true);
  }

  const handleStop = (e) => {
    setStart(false);
  }

  document.onkeydown = (e) => {
    e.preventDefault();
    switch (e.code) {
      case "KeyS":
      case "ArrowDown":
        setRefPoint(() => new Point(refPoint.x, refPoint.y - 1));
        break;
      case "KeyW":
      case "ArrowUp":
        tetris.rotate();
        break;
      case "KeyA":
      case "ArrowLeft":
        setRefPoint(() => new Point(refPoint.x - 1, refPoint.y));
        break;
      case "KeyD":
      case "ArrowRight":
        setRefPoint(() => new Point(refPoint.x + 1, refPoint.y));
        break;
    }

  };
  return (
    <div className="canvas">
      <h1>{timerId}</h1>
      <button onClick={handlerStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      {
        dataMatrix.map((row, idx) => (idx < 19 && (
          <div className='columns' key={idx}>
            {row.map((col, offset) => (
              <div className={`sharp s-rounded ${col ? 'bg-dark' : 'bg-gray'}`} key={offset}></div>
            ))}
          </div>
        ))
        )
      }
    </div>
  )
}

export default Canvas;