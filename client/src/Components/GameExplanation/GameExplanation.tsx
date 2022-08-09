import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        <span className="emph">Abilities:</span> The custom pieces in this game have abilities. Some of these abilities
        can only be used by expending{' '}
        <span className={`rune`}>
          <FontAwesomeIcon icon={faBolt} />
        </span>{' '}
        (energy). If an ability is marked (Quick), that means that using that ability does not take up your turn.
      </p>
      <p>
        <span className="emph">Runes:</span> Two squares on the board will have an icon (
        <span className={`rune`}>
          <FontAwesomeIcon icon={faBolt} />
        </span>
        ) denoting them as rune squares. At the end of <span className="emph">every</span> turn, for every piece a
        player has on a rune square, they gain 1{' '}
        <span className={`rune`}>
          <FontAwesomeIcon icon={faBolt} />
        </span>{' '}
        (energy).
      </p>
      <p>
        Please note that the current build of the game may have major and/or minor bugs, and that the balance of the
        pieces and sets has not yet been tested.
      </p>
      <p>
        To try the game out, select an option from the left sidebar (online play and computer opponents are currently a
        work-in-progress).
      </p>
    </div>
  );
};

export default GameExplanation;
