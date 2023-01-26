import './styles/App.css';
import mario from './images/mario.jpg';
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
  let targetingArea = document.querySelector('div.targeting-area');
  const onMouseMove = (e) => {
    targetingArea.style.left = e.pageX + 'px';
    targetingArea.style.top = e.pageY + 'px';
  };

  return (
    <div className="App" onMouseMove={onMouseMove}>
      <img src={mario} className="game-image" alt="mario game"></img>
      <div className="targeting-area"></div>
    </div>
  );
}

export default App;
