import '../styles/Navbar.css';
import CharacterList from '../components/CharacterList';
import { useState, useEffect } from 'react';

function Navbar(props) {
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [displayingCharList, setDisplayingCharList] = useState(false);

  useEffect(() => {
    if (props.displayingMenu) {
      setTimerHours(0);
      setTimerMinutes(0);
      setTimerSeconds(0);
      setDisplayingCharList(false);
    }
    const timer = setTimeout(() => {
      if (props.displayingMenu) {
        return;
      }
      if (timerSeconds === 59) {
        setTimerSeconds(0);
        if (timerMinutes === 59) {
          setTimerMinutes(0);
          if (timerHours === 59) {
            setTimerHours(0);
          } else {
            setTimerHours(timerHours + 1);
          }
        } else {
          setTimerMinutes(timerMinutes + 1);
        }
      } else {
        setTimerSeconds(timerSeconds + 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [timerSeconds, props.displayingMenu, timerMinutes, timerHours]);

  const toggleCharList = (e) => {
    setDisplayingCharList(!displayingCharList);
  };

  return (
    <nav className="navbar">
      <h1
        className="menu-logo nav-link"
        onClick={() => {
          props.setListOfChars([]);
        }}
      >
        <span style={{ color: 'white' }}>Find-a </span>
        <span style={{ color: 'red' }}>Me!</span>
      </h1>
      <h1 className="time-display">{`${
        (timerHours < 10 ? '0' : '') + timerHours
      }:${(timerMinutes < 10 ? '0' : '') + timerMinutes}:${
        (timerSeconds < 10 ? '0' : '') + timerSeconds
      }`}</h1>
      <h1
        className="characters-btn nav-link"
        style={{ color: 'white' }}
        onClick={toggleCharList}
      >
        Characters
        {displayingCharList ? (
          <CharacterList listOfChars={props.listOfChars} />
        ) : null}
      </h1>
    </nav>
  );
}

export default Navbar;
