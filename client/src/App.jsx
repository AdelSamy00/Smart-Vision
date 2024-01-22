import { Routes, Route } from 'react-router-dom';
import Profile from './components/Profile.jsx';
import { Landing } from './pages/';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
    </Routes>
  );
}

export default App;
