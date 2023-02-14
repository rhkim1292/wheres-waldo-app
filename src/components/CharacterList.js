import '../styles/CharacterList.css';
import cappy from '../images/cappy.png';
import superbell from '../images/superbell.png';
import yoshiegg from '../images/yoshiegg.png';

function CharacterList(props) {
  const displayCorrectCharacter = (char) => {
    switch (char.name) {
      case 'Cappy':
        return (
          <div className="img-col">
            <img src={cappy} alt={char.name} />
          </div>
        );
      case 'Super Bell':
        return (
          <div className="img-col">
            <img src={superbell} alt={char.name} />
          </div>
        );
      case 'Yoshi Egg':
        return (
          <div className="img-col">
            <img src={yoshiegg} alt={char.name} />
          </div>
        );
      default:
        return;
    }
  };

  return (
    <ul className="char-list">
      {props.listOfChars.map((currChar) => {
        return (
          <li className="char-list-row" key={currChar.name}>
            {displayCorrectCharacter(currChar)}
            <div className="name-col">{currChar.name}</div>
          </li>
        );
      })}
    </ul>
  );
}

export default CharacterList;
