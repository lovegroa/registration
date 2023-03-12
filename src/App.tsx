import './App.css';
import {Route, Routes} from 'react-router-dom';
import SignUp from './routes/sign-up/sign-up.route';
import {useContext} from 'react';
import {UserContext} from './contexts/user.context';
import SignIn from './routes/sign-in/sign-in.route';
import Homepage from './routes/homepage/homepage.route';

function App() {
  const {currentUser} = useContext(UserContext);

  return (
    <Routes>
      {currentUser ? (
        <>
          <Route path="*" element={<Homepage />} />
        </>
      ) : (
        <>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<SignIn />} />
        </>
      )}
    </Routes>
  );
}

export default App;
