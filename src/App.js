import './styles/App.css';
import mario from './images/mario.jpg';
import { useState } from 'react';
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
    },
    {
      name: 'Super Bell',
    },
    {
      name: 'Cappy',
    },
  ];
  const onMouseMove = (e) => {
    const targetingArea = document.querySelector('div.targeting-box');
    if (userIsTagging) return;
    targetingArea.style.left = e.pageX + 'px';
    targetingArea.style.top = e.pageY + 'px';
    // console.log('Page X: ', e.pageX);
    // console.log('Page Y: ', e.pageY);
  };

  const handleClick = (e) => {
    if (userIsTagging) {
      const targetingArea = document.querySelector('div.targeting-box');
      targetingArea.style.left = e.pageX + 'px';
      targetingArea.style.top = e.pageY + 'px';
      setUserIsTagging(false);
    } else {
      const rect = e.target.getBoundingClientRect();
      const imageX = e.clientX - rect.left;
      const imageY = e.clientY - rect.top;
      const imageXpercent = imageX / rect.width;
      const imageYpercent = imageY / rect.height;
      console.log('X%: ', imageXpercent);
      console.log('Y%: ', imageYpercent);
      console.log('Left? : ' + imageX + ' ; Top? : ' + imageY + '.');
      setUserIsTagging(true);
    }
  };

  return (
    <div className="App">
      <GameImage
        imgSrc={mario}
        onMouseMove={onMouseMove}
        handleClick={handleClick}
      />
      <TargetingBox listOfChars={listOfChars} userIsTagging={userIsTagging} />
    </div>
  );
}

export default App;
