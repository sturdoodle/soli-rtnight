
import './App.css';
import ProfileForm from './ProfileForm';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
   <>
   <Routes>
        <Route path="/" element={<ProfileForm/>} />
        <Route path="/about" element={<ProfileForm/>} />
      </Routes>
   
   </>
  );
}

export default App;
