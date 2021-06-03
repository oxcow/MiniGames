import {Game as TicTacToeGame} from "./games/tictactoe";
import PuzzleGame from "./games/npuzzle";
import TetrisGame from "./games/tetris";

const routeConfig = [
  {
    path: "/tac",
    name: "React Demo",
    component: TicTacToeGame,
  },
  {
    path: '/nPuzzle',
    name: "数字华容道",
    component: PuzzleGame,
  },
  {
    path: "/tetris",
    name: "俄罗斯方块",
    component: TetrisGame,
  },
];

export default routeConfig