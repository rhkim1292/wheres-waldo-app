import './styles/App.css';
import mario from './images/mario.jpg';
import { useState, useEffect } from 'react';
import GameImage from './components/GameImage';
import TargetingBox from './components/TargetingBox';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB4Ob5qUsKzmz_fe_4Kg8nHFz0MK4C0P6k',
  authDomain: 'wheres-waldo-a0579.firebaseapp.com',
  projectId: 'wheres-waldo-a0579',
  storageBucket: 'wheres-waldo-a0579.appspot.com',
  messagingSenderId: '758994543776',
  appId: '1:758994543776:web:8b0dbe5db3a74ba83c15c5',
  measurementId: 'G-ZK1W58YTZ1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

function App() {
  const [userIsTagging, setUserIsTagging] = useState(false);
  const listOfChars = [
    {
      name: 'Yoshi Egg',
      className: 'yoshi-egg-box',
    },
    {
      name: 'Super Bell',
      className: 'super-bell-box',
    },
    {
      name: 'Cappy',
      className: 'cappy-box',
    },
  ];
  useEffect(() => {
    const targetingArea = document.querySelector('div.targeting-box');
    const targetingAreaRect = targetingArea.getBoundingClientRect();
    const gameImageRect = document
      .querySelector('img.game-image')
      .getBoundingClientRect();
    for (let i = 0; i < listOfChars.length; i += 1) {
      const currCharRect = document
        .querySelector(`div.${listOfChars[i].className}`)
        .getBoundingClientRect();
      listOfChars[i] = {
        ...listOfChars[i],
        ...convertToPctCoord(gameImageRect, currCharRect),
      };
    }

    if (userIsTagging) {
      for (let i = 0; i < listOfChars.length; i += 1) {
        console.log(
          `Overlapping ${listOfChars[i].name}: ${checkOverlap(
            targetingAreaRect,
            listOfChars[i]
          )}`
        );
      }
    }
  });

  const checkOverlap = (targetingBoxRect, charObj) => {
    const gameImageRect = document
      .querySelector('img.game-image')
      .getBoundingClientRect();
    return !(
      targetingBoxRect.right <
        convertToPixelCoord(charObj.leftPct, gameImageRect.width) ||
      targetingBoxRect.left >
        convertToPixelCoord(charObj.rightPct, gameImageRect.width) ||
      targetingBoxRect.bottom <
        convertToPixelCoord(charObj.topPct, gameImageRect.height) ||
      targetingBoxRect.top >
        convertToPixelCoord(charObj.bottomPct, gameImageRect.height)
    );
  };

  const onMouseMove = (e) => {
    const targetingArea = document.querySelector('div.targeting-box');
    if (userIsTagging) return;
    targetingArea.style.left = e.pageX + 'px';
    targetingArea.style.top = e.pageY + 'px';
  };

  const handleClick = (e) => {
    const targetingArea = document.querySelector('div.targeting-box');
    targetingArea.style.left = e.pageX + 'px';
    targetingArea.style.top = e.pageY + 'px';
    if (userIsTagging) {
      setUserIsTagging(false);
    } else {
      setUserIsTagging(true);
    }
  };

  const convertToPctCoord = (baseRect, targetRect) => {
    return {
      topPct: targetRect.top / baseRect.height,
      rightPct: targetRect.right / baseRect.width,
      bottomPct: targetRect.bottom / baseRect.height,
      leftPct: targetRect.left / baseRect.width,
    };
  };

  const convertToPixelCoord = (pctVal, totalPixelSize) => {
    return pctVal * totalPixelSize;
  };

  return (
    <div className="App">
      <div className="game-container">
        <GameImage
          imgSrc={mario}
          onMouseMove={onMouseMove}
          handleClick={handleClick}
        />
        <div className={listOfChars[0].className + ' char-box'}></div>
        <div className={listOfChars[1].className + ' char-box'}></div>
        <div className={listOfChars[2].className + ' char-box'}></div>
      </div>
      <TargetingBox listOfChars={listOfChars} userIsTagging={userIsTagging} />
    </div>
  );
}

export default App;
