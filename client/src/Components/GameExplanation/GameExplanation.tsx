import './GameExplanation.css';

const GameExplanation = (): JSX.Element => {
  return (
    <div className="game-explanation">
      <p>
        Hello! This is a very early proof-of-concept build for an as-of-yet unnamed game that probably has something to
        do with chess.
      </p>
      <p>The general concept of the game is a combination of chess, a class-based strategy game, and a deckbuilder.</p>
      <p>
        The proof-of-concept game currently has one board (the traditional 8x8 chess board) as well as two sets of
        custom pieces (<span className="emph poison-text">Scourge</span> and <span className="emph blood">Crimson</span>
        ), each with unique abilities and mechanics that build upon the traditional rules of chess.
      </p>
      <p>
        <span className="emph">Abilities:</span> The custom pieces in this game have abilities. These abilities
      </p>
      <p>
        <span className="emph">Runes:</span>
      </p>
      <p>
        To try the game out, select an option from the left sidebar (online play and computer opponents are currently a
        work-in-progress).
      </p>
    </div>
  );
};

export default GameExplanation;
