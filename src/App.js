import './styles/App.css';
import mario from './images/mario.jpg';
import { useState, useEffect } from 'react';
import GameImage from './components/GameImage';
import TargetingBox from './components/TargetingBox';
import GameAlerts from './components/GameAlerts';
import GameMenu from './components/GameMenu';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, getDocs, collection } from 'firebase/firestore';

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
  const [listOfChars, setListOfChars] = useState([]);
  const [displayingMenu, setDisplayingMenu] = useState(true);
  const [displayingAlert, setDisplayingAlert] = useState(false);
  const [charFound, setCharFound] = useState(false);
  const [foundCharName, setFoundCharName] = useState('');

  useEffect(() => {
    const retrieveCharData = async () => {
      const querySnapshot = await getDocs(collection(db, 'marioImage'));
      const newListOfChars = [];
      querySnapshot.forEach((doc) => {
        newListOfChars.push(doc.data());
      });
      setListOfChars(newListOfChars);
    };
    retrieveCharData();
  }, []);

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

  const handleImgClick = (e) => {
    const targetingArea = document.querySelector('div.targeting-box');
    targetingArea.style.left = e.pageX + 'px';
    targetingArea.style.top = e.pageY + 'px';
    if (userIsTagging) {
      setUserIsTagging(false);
    } else {
      setUserIsTagging(true);
    }
  };

  const handleCharClick = (e) => {
    const charToCheck = e.target.textContent;
    const targetingArea = document.querySelector('div.targeting-box');
    const targetingAreaRect = targetingArea.getBoundingClientRect();
    targetingArea.style.left = e.pageX + 'px';
    targetingArea.style.top = e.pageY + 'px';
    for (let i = 0; i < listOfChars.length; i += 1) {
      if (listOfChars[i].name === charToCheck) {
        if (checkOverlap(targetingAreaRect, listOfChars[i])) {
          setListOfChars(
            listOfChars.filter((currChar) => {
              if (currChar.name !== charToCheck) return currChar;
              return null;
            })
          );
          setCharFound(true);
          setFoundCharName(charToCheck);
          setDisplayingAlert(true);
        } else {
          setCharFound(false);
          setDisplayingAlert(true);
        }
      }
    }
    setUserIsTagging(false);
  };

  const convertToPixelCoord = (pctVal, totalPixelSize) => {
    return pctVal * totalPixelSize;
  };

  const displayAlert = () => {
    if (charFound) {
      return (
        <GameAlerts
          displayedText={`You found ${foundCharName}!`}
          bgColor="#080"
          display="block"
          setDisplayingAlert={setDisplayingAlert}
          delay={3000}
        />
      );
    } else {
      return (
        <GameAlerts
          displayedText={`Wrong! Keep looking!`}
          bgColor="red"
          display="block"
          setDisplayingAlert={setDisplayingAlert}
          delay={3000}
        />
      );
    }
  };

  // const setAlertRemovalTimeout = (time) => {
  //   setTimeout(() => {
  //     const gameAlertDiv = document.querySelector('div.game-alert');
  //     gameAlertDiv.display = 'none';
  //   }, time);
  // };

  return (
    <div className="App">
      <div className="game-container">
        <GameImage
          imgSrc={mario}
          onMouseMove={onMouseMove}
          handleClick={handleImgClick}
        />
      </div>
      {displayingMenu ? null : (
        <TargetingBox
          listOfChars={listOfChars}
          userIsTagging={userIsTagging}
          handleCharClick={handleCharClick}
        />
      )}
      {displayingMenu ? (
        <GameMenu setDisplayingMenu={setDisplayingMenu} />
      ) : null}
      {displayingAlert ? displayAlert() : null}
    </div>
  );
}

export default App;
