import { useState } from "react";
import { BishopBasic, setUpSquare, EmptySquare, KingBasic, KnightBasic, PawnBasic, QueenBasic, RookBasic } from "../piecesBasic";
import { Move, MoveFlag, Owner, Piece, PieceType, SquareContents, SquareStatus } from "../types";
import "./Board.css";
import Square from "./Square";

// TODO: REDUX Game State
const initialGameState: SquareContents[][] = [
  [setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false)],
  [setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(RookBasic(), 1, 0, true), setUpSquare(KnightBasic(), 1, 0, true), 
    setUpSquare(BishopBasic(), 1, 0, true), setUpSquare(QueenBasic(), 1, 0, true), setUpSquare(KingBasic(), 1, 0, true), 
    setUpSquare(BishopBasic(), 1, 0, true), setUpSquare(KnightBasic(), 1, 0, true), setUpSquare(RookBasic(), 1, 0, true), 
    setUpSquare(EmptySquare(), 2, 2, false)],
  [setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(PawnBasic(), 1, 0, true), setUpSquare(PawnBasic(), 1, 0, true), 
    setUpSquare(PawnBasic(), 1, 0, true), setUpSquare(PawnBasic(), 1, 0, true), setUpSquare(PawnBasic(), 1, 0, true), 
    setUpSquare(PawnBasic(), 1, 0, true), setUpSquare(PawnBasic(), 1, 0, true), setUpSquare(PawnBasic(), 1, 0, true), 
    setUpSquare(EmptySquare(), 2, 2, false)],
  [setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), 
    setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), 
    setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), 
    setUpSquare(EmptySquare(), 2, 2, false)],
  [setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), 
    setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), 
    setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), 
    setUpSquare(EmptySquare(), 2, 2, false)],
  [setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), 
    setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), 
    setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), 
    setUpSquare(EmptySquare(), 2, 2, false)],
  [setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), 
    setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), 
    setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), 
    setUpSquare(EmptySquare(), 2, 2, false)],
  [setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(PawnBasic(), 0, 1, true), setUpSquare(PawnBasic(), 0, 1, true), 
    setUpSquare(PawnBasic(), 0, 1, true), setUpSquare(PawnBasic(), 0, 1, true), setUpSquare(PawnBasic(), 0, 1, true), 
    setUpSquare(PawnBasic(), 0, 1, true), setUpSquare(PawnBasic(), 0, 1, true), setUpSquare(PawnBasic(), 0, 1, true), 
    setUpSquare(EmptySquare(), 2, 2, false)],
  [setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(RookBasic(), 0, 1, true), setUpSquare(KnightBasic(), 0, 1, true), 
    setUpSquare(BishopBasic(), 0, 1, true), setUpSquare(QueenBasic(), 0, 1, true), setUpSquare(KingBasic(), 0, 1, true), 
    setUpSquare(BishopBasic(), 0, 1, true), setUpSquare(KnightBasic(), 0, 1, true), setUpSquare(RookBasic(), 0, 1, true), 
    setUpSquare(EmptySquare(), 2, 2, false)],
  [setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false)],
]

const Board = (): JSX.Element => {
  const [gameState, setGameState] = useState(initialGameState);
  const [listener, setListener] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number|null>(null);
  const [selectedCol, setSelectedCol] = useState<number|null>(null);
  const [turn, setTurn] = useState<Owner>(0);

  const removePiece = (prevState: SquareContents[][], row: number, col: number) => {
    // prevState[row][col].piece.onDeath();
    prevState[row][col].piece = EmptySquare();
  }

  const movePiece = (prevState: SquareContents[][], piece: Piece, row: number, col: number) => {
    // piece.onMove();
    // TODO: fix nMoves counting too much
    if (prevState[row][col].squareStatuses.has(SquareStatus.HLC)) {
      // Castle Logic
      let kingPos = 0;
      for (let i = 0; i < prevState[row].length; i++) {
        if (prevState[row][i].squareStatuses.has(SquareStatus.SEL)) {
          kingPos = i;
          break;
        }
      }
      if (col < kingPos) {
        // Castling to the left
        let i = 1;
        while (prevState[row][col - i].piece.pieceType !== PieceType.rook) {
          i++;
        }
        prevState[row][col + 1].piece = prevState[row][col - i].piece;
        prevState[row][col - i].piece = EmptySquare();
      } else {
        // Castling to the right
        let i = 1;
        while (prevState[row][col + i].piece.pieceType !== PieceType.rook) {
          i++;
        }
        prevState[row][col - 1].piece = prevState[row][col + i].piece;
        prevState[row][col + i].piece = EmptySquare();
      }
    }
    piece.nMoves++;
    prevState[row][col].piece = piece;
  }

  const handleMove = (row: number, col: number) => {
    const pieceToMove = gameState.flat().find((sc: SquareContents) => sc.squareStatuses.has(SquareStatus.SEL))?.piece;
    if (!pieceToMove) return;
    setGameState((prevState) => {
      const originSquare = prevState.flat().find((sc: SquareContents) => sc.squareStatuses.has(SquareStatus.SEL));
      if (originSquare) originSquare.piece = EmptySquare();
      removePiece(prevState, row, col);
      movePiece(prevState, pieceToMove, row, col);
      let i = 0;
      for (const row of prevState) {
        let j = 0;
        for (const cell of row) {
          prevState[i][j]?.squareStatuses.delete(SquareStatus.HL);
          prevState[i][j]?.squareStatuses.delete(SquareStatus.SEL);
          prevState[i][j]?.squareStatuses.delete(SquareStatus.HLC);
          prevState[i][j]?.squareStatuses.delete(SquareStatus.HLK);
          j++;
        }
        i++;
      }
      console.log(prevState[row][col].piece.nMoves);
      return prevState;
    })
    setListener(!listener);
  }

  const handleSelect = (row: number, col: number) => {
    const movesToHighlight: Move[] = gameState[row][col]?.piece.moveF(gameState[row][col]?.piece, row, col, gameState, true);
    const selectedSameSquare = (selectedRow === row && selectedCol === col);
    setGameState((prevState) => {
      let i = 0;
      for (const row of prevState) {
        let j = 0;
        for (const cell of row) {
          let match = false;
          let castle = false;
          let kill = false;
          for (const move of movesToHighlight) {
            if (move.row === i && move.col === j) {
              match = true;
              if (move.flags?.has(MoveFlag.castle)) {
                castle = true;
              }
              if (move.flags?.has(MoveFlag.kill)) {
                kill = true;
              }
              break;
            }
          }
          if (match && !selectedSameSquare) {
            if (castle) {
              prevState[i][j]?.squareStatuses.add(SquareStatus.HLC);
            } else if (kill) {
              prevState[i][j]?.squareStatuses.add(SquareStatus.HLK);
            } else {
              prevState[i][j]?.squareStatuses.add(SquareStatus.HL);
            }
          } else {
            prevState[i][j]?.squareStatuses.delete(SquareStatus.HL);
            prevState[i][j]?.squareStatuses.delete(SquareStatus.HLC);
            prevState[i][j]?.squareStatuses.delete(SquareStatus.HLK);
          }
          prevState[i][j]?.squareStatuses.delete(SquareStatus.SEL);
          j++;
        }
        i++;
      }
      if (!selectedSameSquare) prevState[row][col]?.squareStatuses.add(SquareStatus.SEL);
      return prevState;
    });
    if (!selectedSameSquare) {
      setSelectedRow(row);
      setSelectedCol(col);
    } else {
      setSelectedRow(null);
      setSelectedCol(null);
    }
    setListener(!listener);
  }

  const selectSquare = (row: number, col: number) => {
    const madeMove = gameState[row][col]?.squareStatuses.has(SquareStatus.HL) 
      || gameState[row][col]?.squareStatuses.has(SquareStatus.HLC)
      || gameState[row][col]?.squareStatuses.has(SquareStatus.HLK);
    if (madeMove) {
      handleMove(row, col);
    } else {
      handleSelect(row, col);
    }
  }

  return (
    <div className="Board">
      {gameState.map((row, rowN) => {
        return (
          <div className="row">
          {row.map((val, colN) => {
            return <Square 
            listener={listener} 
            row={rowN} 
            col={colN} 
            content={val} 
            gameState={gameState} 
            clickHandler={selectSquare} />
          })}
          </div>
        )
      })}
    </div>
  );
}

export default Board;
