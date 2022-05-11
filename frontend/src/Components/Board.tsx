import { useState } from "react";
import { BishopBasic, constructPiece, EmptySquare, KingBasic, KnightBasic, PawnBasic, QueenBasic, RookBasic } from "../piecesBasic";
import { Owner, SquareContents } from "../types";
import "./Board.css";
import Square from "./Square";

const standardSquares = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

// TODO: REDUX Game State
const initialGameState: (SquareContents|null)[][] = [
  [null, null, null, null, null, null, null, null, null, null],
  [null, constructPiece(RookBasic(), Owner.dark), constructPiece(KnightBasic(), Owner.dark), 
    constructPiece(BishopBasic(), Owner.dark), constructPiece(KingBasic(), Owner.dark), constructPiece(QueenBasic(), Owner.dark), 
    constructPiece(BishopBasic(), Owner.dark), constructPiece(KnightBasic(), Owner.dark), constructPiece(RookBasic(), Owner.dark), null],
    [null, constructPiece(PawnBasic(), Owner.dark), constructPiece(PawnBasic(), Owner.dark), 
      constructPiece(PawnBasic(), Owner.dark), constructPiece(PawnBasic(), Owner.dark), constructPiece(PawnBasic(), Owner.dark), 
      constructPiece(PawnBasic(), Owner.dark), constructPiece(PawnBasic(), Owner.dark), constructPiece(PawnBasic(), Owner.dark), null],
  [null, EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), null],
  [null, EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), null],
  [null, EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), null],
  [null, EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), null],
  [null, constructPiece(PawnBasic(), Owner.light), constructPiece(PawnBasic(), Owner.light), 
    constructPiece(PawnBasic(), Owner.light), constructPiece(PawnBasic(), Owner.light), constructPiece(PawnBasic(), Owner.light), 
    constructPiece(PawnBasic(), Owner.light), constructPiece(PawnBasic(), Owner.light), constructPiece(PawnBasic(), Owner.light), null],
  [null, constructPiece(RookBasic(), Owner.light), constructPiece(KnightBasic(), Owner.light), 
    constructPiece(BishopBasic(), Owner.light), constructPiece(KingBasic(), Owner.light), constructPiece(QueenBasic(), Owner.light), 
    constructPiece(BishopBasic(), Owner.light), constructPiece(KnightBasic(), Owner.light), constructPiece(RookBasic(), Owner.light), null],
  [null, null, null, null, null, null, null, null, null, null],
]

const Board = (): JSX.Element => {
  const [activeSquares, setActiveSquares] = useState(standardSquares);
  const [gameState, setGameState] = useState(initialGameState);

  return (
    <div className="Board">
      {activeSquares.map((row, rowN) => {
        return (
          <div className="row">
          {row.map((val, colN) => {
            return <Square row={rowN} col={colN} status={val} content={gameState[rowN][colN]} />
          })}
          </div>
        )
      })}
    </div>
  );
}

export default Board;
