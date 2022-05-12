import { useState } from "react";
import { BishopBasic, setUpSquare, EmptySquare, KingBasic, KnightBasic, PawnBasic, QueenBasic, RookBasic } from "../piecesBasic";
import { Move, SquareContents, SquareStatus } from "../types";
import "./Board.css";
import Square from "./Square";

// TODO: REDUX Game State
const initialGameState: (SquareContents|null)[][] = [
  [null, null, null, null, null, null, null, null, null, null],
  [null, setUpSquare(RookBasic(), 1, 0), setUpSquare(KnightBasic(), 1, 0), 
    setUpSquare(BishopBasic(), 1, 0), setUpSquare(QueenBasic(), 1, 0), setUpSquare(KingBasic(), 1, 0), 
    setUpSquare(BishopBasic(), 1, 0), setUpSquare(KnightBasic(), 1, 0), setUpSquare(RookBasic(), 1, 0), null],
  [null, setUpSquare(PawnBasic(), 1, 0), setUpSquare(PawnBasic(), 1, 0), 
    setUpSquare(PawnBasic(), 1, 0), setUpSquare(PawnBasic(), 1, 0), setUpSquare(PawnBasic(), 1, 0), 
    setUpSquare(PawnBasic(), 1, 0), setUpSquare(PawnBasic(), 1, 0), setUpSquare(PawnBasic(), 1, 0), null],
  [null, EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), null],
  [null, EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), null],
  [null, EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), null],
  [null, EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), EmptySquare(), null],
  [null, setUpSquare(PawnBasic(), 0, 1), setUpSquare(PawnBasic(), 0, 1), 
    setUpSquare(PawnBasic(), 0, 1), setUpSquare(PawnBasic(), 0, 1), setUpSquare(PawnBasic(), 0, 1), 
    setUpSquare(PawnBasic(), 0, 1), setUpSquare(PawnBasic(), 0, 1), setUpSquare(PawnBasic(), 0, 1), null],
  [null, setUpSquare(RookBasic(), 0, 1), setUpSquare(KnightBasic(), 0, 1), 
    setUpSquare(BishopBasic(), 0, 1), setUpSquare(QueenBasic(), 0, 1), setUpSquare(KingBasic(), 0, 1), 
    setUpSquare(BishopBasic(), 0, 1), setUpSquare(KnightBasic(), 0, 1), setUpSquare(RookBasic(), 0, 1), null],
  [null, null, null, null, null, null, null, null, null, null],
]

const Board = (): JSX.Element => {
  const [gameState, setGameState] = useState(initialGameState);
  const [anyState, setAnyState] = useState(false);

  const selectSquare = (row: number, col: number, gameState: (SquareContents|null)[][]) => {
    const movesToHighlight: Move[] = gameState[row][col]?.piece.moveF(gameState[row][col]?.piece, row, col, gameState);
    // TODO: Better update logic
    console.log(movesToHighlight);
    setGameState((prevState) => {
      let i = 0;
      for (const row of prevState) {
        let j = 0;
        for (const cell of row) {
          let match = false;
          for (const move of movesToHighlight) {
            if (move.row === i && move.col === j) {
              match = true;
              break;
            }
          }
          if (match) {
            prevState[i][j]?.squareStatuses.add(SquareStatus.HL);
          } else {
            prevState[i][j]?.squareStatuses.delete(SquareStatus.HL);
          }
          j++;
        }
        i++;
      }
      return prevState;
    });
    setAnyState(!anyState);
  }

  return (
    <div className="Board">
      {gameState.map((row, rowN) => {
        return (
          <div className="row">
          {row.map((val, colN) => {
            return <Square listener={anyState} row={rowN} col={colN} content={val==null ? null : val.piece} statuses={val==null ? new Set<SquareStatus>() : val.squareStatuses} gameState={gameState} clickHandler={selectSquare} />
          })}
          </div>
        )
      })}
    </div>
  );
}

export default Board;
