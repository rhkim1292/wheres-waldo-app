import './styles/App.css';
import mario from './images/mario.jpg';
import { useState, useEffect } from 'react';
import GameImage from './components/GameImage';
import TargetingBox from './components/TargetingBox';
import GameAlerts from './components/GameAlerts';
import GameMenu from './components/GameMenu';
import Navbar from './components/Navbar';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
import {
  getFirestore,
  getDocs,
  collection,
  deleteDoc,
  addDoc,
} from 'firebase/firestore';

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
  const [listOfChars, setListOfChars] = useState([1]);
  const [displayingMenu, setDisplayingMenu] = useState(true);
  const [displayingAlert, setDisplayingAlert] = useState(false);
  const [charFound, setCharFound] = useState(false);
  const [foundCharName, setFoundCharName] = useState('');
  const [gameEnd, setGameEnd] = useState(false);
  const [userResultTime, setUserResultTime] = useState({});
  const [submitScore, setSubmitScore] = useState(false);
  const [listOfScores, setListOfScores] = useState([]);
  const [loadingState, setLoadingState] = useState(false);

  // Run once on initial mount
  useEffect(() => {
    retrieveCharData();
  }, []);

  // Run every time the length of listOfChars changes
  useEffect(() => {
    if (listOfChars.length < 1) {
      setGameEnd(true);
      setDisplayingMenu(true);
      setDisplayingAlert(false);
      retrieveCharData();
    }
  }, [listOfChars.length]);

  useEffect(() => {
    const retrieveScoreData = async () => {
      setLoadingState(true);
      const querySnapshot = await getDocs(collection(db, 'highScores'));
      const newListOfScores = [];

      querySnapshot.forEach((doc) => {
        newListOfScores.push(doc.data());
      });

      newListOfScores.sort((a, b) => {
        return convertPlayerTimeToSeconds(a) - convertPlayerTimeToSeconds(b);
      });

      setListOfScores(newListOfScores);

      if (
        newListOfScores.length < 10 ||
        convertPlayerTimeToSeconds(newListOfScores[9]) >
          convertPlayerTimeToSeconds(userResultTime)
      ) {
        setSubmitScore(true);
      } else {
        setSubmitScore(false);
      }
      setLoadingState(false);
    };
    if (displayingMenu && gameEnd) {
      retrieveScoreData();
    }
  }, [displayingMenu, gameEnd, userResultTime]);

  const retrieveCharData = async () => {
    const querySnapshot = await getDocs(collection(db, 'marioImage'));
    const newListOfChars = [];
    querySnapshot.forEach((doc) => {
      newListOfChars.push(doc.data());
    });
    setListOfChars(newListOfChars);
  };

  const convertPlayerTimeToSeconds = (playerTime) => {
    return (
      playerTime.timeHours * 60 * 60 +
      playerTime.timeMinutes * 60 +
      playerTime.timeSeconds
    );
  };

  const sortScoresAscending = (scoreList) => {
    scoreList.sort((a, b) => {
      return convertPlayerTimeToSeconds(a) - convertPlayerTimeToSeconds(b);
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoadingState(true);
    const highScoresColRef = collection(db, 'highScores');
    const querySnapshot = await getDocs(highScoresColRef);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    const formData = new FormData(e.target);
    const userScoreObj = {
      ...userResultTime,
      name: formData.get('username').toUpperCase(),
    };
    if (listOfScores.length < 10) {
      listOfScores.push(userScoreObj);
    } else {
      listOfScores[9] = userScoreObj;
    }

    sortScoresAscending(listOfScores);
    setListOfScores(listOfScores);
    listOfScores.forEach(async (currScore) => {
      await addDoc(highScoresColRef, currScore);
    });
    setSubmitScore(false);
    setLoadingState(false);
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
        } else {
          setCharFound(false);
        }
        setDisplayingAlert(true);
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
          setDisplayingAlert={setDisplayingAlert}
          delay={3000}
        />
      );
    } else {
      return (
        <GameAlerts
          displayedText={`Wrong! Keep looking!`}
          bgColor="red"
          setDisplayingAlert={setDisplayingAlert}
          delay={3000}
        />
      );
    }
  };

  return (
    <div className="App">
      <div className="game-container">
        <Navbar
          gameEnd={gameEnd}
          displayingMenu={displayingMenu}
          listOfChars={listOfChars}
          setUserResultTime={setUserResultTime}
          setGameEnd={setGameEnd}
          setDisplayingMenu={setDisplayingMenu}
        />
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
        <GameMenu
          setDisplayingMenu={setDisplayingMenu}
          setGameEnd={setGameEnd}
          gameEnd={gameEnd}
          userResultTime={userResultTime}
          retrieveCharData={retrieveCharData}
          submitScore={submitScore}
          setSubmitScore={setSubmitScore}
          loadingState={loadingState}
          setLoadingState={setLoadingState}
          listOfScores={listOfScores}
          handleFormSubmit={handleFormSubmit}
        />
      ) : null}
      {displayingAlert ? displayAlert() : null}
    </div>
  );
}

export default App;
