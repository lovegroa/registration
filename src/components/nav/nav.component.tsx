import {useContext, useState} from 'react';
import Hamburger from '../../assets/hamburger.svg';
import {useNavigate} from 'react-router-dom';
import {signOutUser} from '../../utils/firebase';
import {UserContext} from '../../contexts/user.context';
import {BrandNameButton, StyledNavigation} from './nav.styles';

export const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navigate = useNavigate();
  const {setCurrentUser} = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  const currentPath = window.location.pathname.split('/').pop();
  console.log({currentPath});
  return (
    <StyledNavigation>
      <BrandNameButton onClick={() => navigate('/')}>
        Code Challenge
      </BrandNameButton>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <img src={Hamburger} alt="menu"></img>
      </button>
      <div
        className={
          isNavExpanded ? 'navigation-menu expanded' : 'navigation-menu'
        }
      >
        <ul>
          {currentPath === 'profile' ? (
            <></>
          ) : (
            <>
              <li onClick={() => navigate('/profile')}>
                <button className="menu-item">Profile</button>
              </li>
            </>
          )}

          <li onClick={signOutHandler}>
            <button className="menu-item">Sign out</button>
          </li>
        </ul>
      </div>
    </StyledNavigation>
  );
};

export default Navbar;
