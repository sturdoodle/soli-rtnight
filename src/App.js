
import './App.css';
import ProfileForm from './ProfileForm';
import { Routes, Route} from 'react-router-dom';

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
