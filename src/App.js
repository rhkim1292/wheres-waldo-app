import './styles/App.css';
import mario from './images/mario.jpg';
import { useState, useEffect } from 'react';
import GameImage from './components/GameImage';
import TargetingBox from './components/TargetingBox';

// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use

// const firebaseConfig = {
//   apiKey: 'AIzaSyB4Ob5qUsKzmz_fe_4Kg8nHFz0MK4C0P6k',
//   authDomain: 'wheres-waldo-a0579.firebaseapp.com',
//   projectId: 'wheres-waldo-a0579',
//   storageBucket: 'wheres-waldo-a0579.appspot.com',
//   messagingSenderId: '758994543776',
//   appId: '1:758994543776:web:8b0dbe5db3a74ba83c15c5',
//   measurementId: 'G-ZK1W58YTZ1',
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

function App() {
  const [userIsTagging, setUserIsTagging] = useState(false);
  const listOfChars = [
    {
      name: 'Yoshi Egg',
      className: 'yoshi-egg-box',
      charRect: null,
      // charRect: document
      //   .querySelector('div.yoshi-egg-box')
      //   .getBoundingClientRect(),
    },
    {
      name: 'Super Bell',
      className: 'super-bell-box',
      charRect: null,
      // charRect: document
      //   .querySelector('div.super-bell-box')
      //   .getBoundingClientRect(),
    },
    {
      name: 'Cappy',
      className: 'cappy-box',
      charRect: null,
      // charRect: document.querySelector('div.cappy-box').getBoundingClientRect(),
    },
  ];
  useEffect(() => {
    const targetingArea = document.querySelector('div.targeting-box');
    const targetingAreaRect = targetingArea.getBoundingClientRect();
    for (let i = 0; i < listOfChars.length; i += 1) {
      listOfChars[i].charRect = document
        .querySelector(`div.${listOfChars[i].className}`)
        .getBoundingClientRect();
    }

    if (userIsTagging) {
      for (let i = 0; i < listOfChars.length; i += 1) {
        console.log(
          `Overlapping ${listOfChars[i].name}: ${checkOverlap(
            listOfChars[i].charRect,
            targetingAreaRect
          )}`
        );
      }
    }
  });

  const checkOverlap = (rect1, rect2) => {
    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
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
      // const rect = e.target.getBoundingClientRect();
      // const imageX = e.clientX - rect.left;
      // const imageY = e.clientY - rect.top;
      // const imageXpercent = imageX / rect.width;
      // const imageYpercent = imageY / rect.height;
      // console.log('X%: ', imageXpercent);
      // console.log('Y%: ', imageYpercent);
      // console.log('Left? : ' + imageX + ' ; Top? : ' + imageY + '.');
    }
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
