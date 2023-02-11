import '../styles/Navbar.css';
import CharacterList from '../components/CharacterList';
import { useState, useEffect } from 'react';

function Navbar(props) {
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [displayingCharList, setDisplayingCharList] = useState(false);

  const {
    gameEnd,
    displayingMenu,
    listOfChars,
    setUserResultTime,
    setGameEnd,
    setDisplayingMenu,
  } = props;

  useEffect(() => {
    if (gameEnd) {
      setUserResultTime({
        hours: timerHours,
        minutes: timerMinutes,
        seconds: timerSeconds,
      });
      setDisplayingCharList(false);
    }

    if (!gameEnd && displayingMenu) {
      setTimerHours(0);
      setTimerMinutes(0);
      setTimerSeconds(0);
    }

    const timer = setTimeout(() => {
      if (displayingMenu) {
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
  }, [
    timerSeconds,
    displayingMenu,
    timerMinutes,
    timerHours,
    gameEnd,
    setUserResultTime,
  ]);

  const toggleCharList = (e) => {
    setDisplayingCharList(!displayingCharList);
  };

  return (
    <nav className="navbar">
      <h1
        className="menu-logo nav-link"
        onClick={() => {
          setGameEnd(false);
          setDisplayingMenu(true);
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
          <CharacterList listOfChars={listOfChars} />
        ) : null}
      </h1>
    </nav>
  );
}

export default Navbar;
