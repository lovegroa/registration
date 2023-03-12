import {useContext, useState} from 'react';
import './nav.styles.css';
import Burger from '../../assets/hamburger.svg';
import {useNavigate} from 'react-router-dom';
import {signOutUser} from '../../utils/firebase';
import {UserContext} from '../../contexts/user.context';

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navigate = useNavigate();
  const {setCurrentUser} = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  return (
    <nav className="navigation">
      <button onClick={() => navigate('/')} className="brand-name">
        Code Challenge
      </button>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <img src={Burger} alt="menu"></img>
      </button>
      <div
        className={
          isNavExpanded ? 'navigation-menu expanded' : 'navigation-menu'
        }
      >
        <ul>
          <li>
            <button onClick={() => navigate('/profile')} className="menu-item">
              Profile
            </button>
          </li>
          <li>
            <button onClick={signOutHandler} className="menu-item">
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
