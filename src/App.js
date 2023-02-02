import './styles/App.css';
import mario from './images/mario.jpg';
import { useState, useEffect } from 'react';
import GameImage from './components/GameImage';
import TargetingBox from './components/TargetingBox';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

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
    setupFirestore();
  }, []);

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

  const setupFirestore = async () => {
    const yoshiEggRef = doc(db, 'marioImage', 'Yoshi Egg');
    const superBellRef = doc(db, 'marioImage', 'Super Bell');
    const cappyRef = doc(db, 'marioImage', 'Cappy');
    const yoshiEggSnap = await getDoc(yoshiEggRef);
    const superBellSnap = await getDoc(superBellRef);
    const cappySnap = await getDoc(cappyRef);
    if (yoshiEggSnap.exists()) {
    } else {
      try {
        await setDoc(
          yoshiEggRef,
          {
            name: 'Yoshi Egg',
            className: 'yoshi-egg-box',
            topPct: 0.31079254348108265,
            rightPct: 0.4515764354013641,
            bottomPct: 0.3158496974908236,
            leftPct: 0.44449532673502434,
          },
          { merge: true }
        );
        console.log('Document written with ID: ', yoshiEggRef);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }

    if (superBellSnap.exists()) {
    } else {
      try {
        await setDoc(
          superBellRef,
          {
            name: 'Super Bell',
            className: 'super-bell-box',
            topPct: 0.49499280139667745,
            rightPct: 0.08207475359172364,
            bottomPct: 0.5000499554064184,
            leftPct: 0.07499364492538392,
          },
          { merge: true }
        );
        console.log('Document written with ID: ', superBellRef);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }

    if (cappySnap.exists()) {
    } else {
      try {
        await setDoc(
          cappyRef,
          {
            name: 'Cappy',
            className: 'cappy-box',
            topPct: 0.7629947210242302,
            rightPct: 0.603674057429621,
            bottomPct: 0.7680518750339711,
            leftPct: 0.5965929487632813,
          },
          { merge: true }
        );
        console.log('Document written with ID: ', cappyRef);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  };

  const checkOverlap = (targetingBoxRect, charObj) => {
    const gameImageRect = document
      .querySelector('img.game-image')
      .getBoundingClientRect();
    return !(
      targetingBoxRect.right + window.scrollX <
        convertToPixelCoord(charObj.leftPct, gameImageRect.width) ||
      targetingBoxRect.left + window.scrollX >
        convertToPixelCoord(charObj.rightPct, gameImageRect.width) ||
      targetingBoxRect.bottom + window.scrollY <
        convertToPixelCoord(charObj.topPct, gameImageRect.height) ||
      targetingBoxRect.top + window.scrollY >
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
    console.log(listOfChars);
    if (userIsTagging) {
      setUserIsTagging(false);
    } else {
      setUserIsTagging(true);
    }
  };

  const convertToPctCoord = (baseRect, targetRect) => {
    return {
      topPct: (targetRect.top + window.scrollY) / baseRect.height,
      rightPct: (targetRect.right + window.scrollX) / baseRect.width,
      bottomPct: (targetRect.bottom + window.scrollY) / baseRect.height,
      leftPct: (targetRect.left + window.scrollX) / baseRect.width,
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
