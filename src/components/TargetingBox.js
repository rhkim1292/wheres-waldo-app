import '../styles/TargetingBox.css';

function TargetingBox(props) {
  return (
    <div className="targeting-box">
      {props.userIsTagging ? (
        <div className="character-picker">
          <ul>
            {props.listOfChars.map((char, idx) => {
              return (
                <li key={char.name} onClick={props.handleCharClick}>
                  {char.name}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default TargetingBox;
