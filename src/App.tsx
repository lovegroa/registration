import './App.css';
import {Route, Routes} from 'react-router-dom';
import SignUp from './routes/sign-up/sign-up.route';

function App() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
}

export default App;
