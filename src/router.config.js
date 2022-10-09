import { Game as TicTacToeGame } from "./games/tictactoe";
import PuzzleGame from "./games/npuzzle";
import TetrisGames from "./games/tetris";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
// import ReactTetris from "./games/tetris/new/ReactTetris";
import SnakeGame from "./games/snake";
import ReactSnakeGame from './games/snake/react/SnakeGame';

export const routeConfig = [
  {
    path: "/tac",
    name: "React Demo",
  },
  {
    path: '/nPuzzle',
    name: "数字华容道",
  },
  {
    path: "/tetris",
    name: "俄罗斯方块",
  },
  // {
  //   path: "/react_tetris",
  //   name: "俄罗斯方块(react)",
  // },
  {
    path: "/h5_snake",
    name: "贪吃蛇(H5 Canvas)",
  },
  {
    path: "/react_snake",
    name: "贪吃蛇(React)",
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/tac',
        element: <TicTacToeGame />,
      },
      {
        path: '/nPuzzle',
        element: <PuzzleGame />,
      },
      {
        path: '/tetris',
        element: <TetrisGames />,
      },
      // {
      //   path: '/react_tetris',
      //   element: <ReactTetris />,
      // },
      {
        path: '/h5_snake',
        element: <SnakeGame />,
      },
      {
        path: '/react_snake',
        element: <ReactSnakeGame />,
      },
    ]
  },
]);

export default router;