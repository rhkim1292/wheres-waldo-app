import '../styles/GameMenu.css';
import cappy from '../images/cappy.png';
import superbell from '../images/superbell.png';
import yoshiegg from '../images/yoshiegg.png';

function GameMenu(props) {
  return (
    <div className="menu-background">
      <div className="menu-flex-container">
        <h1 className="menu-title">
          <span style={{ color: 'white' }}>Find-a </span>
          <span style={{ color: 'red' }}>Me!</span>
        </h1>
        {props.gameEnd ? (
          <div className="menu-results">
            <div className="high-scores">
              <h1 className="high-scores-title">High Scores</h1>
              <ol>
                <li>test</li>
                <li>test</li>
              </ol>
            </div>
            <div className="user-time">
              <h1 className="your-time-title">Your Time</h1>
              <h2 className="result-time">{`${
                (props.userResultTime.hours < 10 ? '0' : '') +
                props.userResultTime.hours
              }:${
                (props.userResultTime.minutes < 10 ? '0' : '') +
                props.userResultTime.minutes
              }:${
                (props.userResultTime.seconds < 10 ? '0' : '') +
                props.userResultTime.seconds
              }`}</h2>
              <button
                onClick={() => {
                  props.setGameEnd(false);
                  props.setDisplayingMenu(true);
                  props.retrieveCharData();
                }}
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <div className="menu-main">
            <h2>Find us in the following image!</h2>
            <div className="menu-row">
              <div className="char-image-col">
                <img src={cappy} alt="Cappy Reference"></img>
              </div>
              <div className="char-description-col">
                <h2>Cappy</h2>
              </div>
            </div>
            <div className="menu-row">
              <div className="char-image-col">
                <img src={superbell} alt="Super Bell Reference"></img>
              </div>
              <div className="char-description-col">
                <h2>Super Bell</h2>
              </div>
            </div>
            <div className="menu-row">
              <div className="char-image-col">
                <img src={yoshiegg} alt="Yoshi Egg Reference"></img>
              </div>
              <div className="char-description-col">
                <h2>Yoshi Egg</h2>
              </div>
            </div>
            <button
              onClick={() => {
                props.setGameEnd(false);
                props.setDisplayingMenu(false);
                props.retrieveCharData();
              }}
            >
              Start!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameMenu;
