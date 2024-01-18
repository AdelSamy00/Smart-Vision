import { Routes, Route } from 'react-router-dom';
import Profile from './components/Profile.jsx';



function App() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />}></Route>
    </Routes>
  );
}

export default App;
