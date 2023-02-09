import '../styles/GameAlerts.css';
import { useEffect, useState } from 'react';

function GameAlerts(props) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      props.setDisplayingAlert(false);
    }, props.delay);
    return () => clearTimeout(timer);
  }, [props]);
  const alertStyle = {
    backgroundColor: props.bgColor,
  };
  return visible ? (
    <div className="game-alert" style={alertStyle}>
      {props.displayedText}
    </div>
  ) : null;
}

export default GameAlerts;
