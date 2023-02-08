import '../styles/Navbar.css';
import { useState, useEffect } from 'react';

function Navbar(props) {
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (props.displayingMenu) return;
      setTimerSeconds(timerSeconds + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timerSeconds, props.displayingMenu]);
  return (
    <nav className="navbar">
      <h1 className="time-display">{timerSeconds}</h1>
    </nav>
  );
}

export default Navbar;
