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
              props.setDisplayingMenu(false);
            }}
          >
            Start!
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameMenu;
