import {User} from 'firebase/auth';
import {useContext, useEffect, useState} from 'react';
import {Icon} from '../../components/icon/icon.styles';
import Navbar from '../../components/nav/nav.component';
import {UserContext} from '../../contexts/user.context';
import {getUserInfo} from '../../utils/firebase';
import {MainContainer, MiddleContainer, TopContainer} from './profile.styles';

export const Profile = () => {
  const {currentUser} = useContext(UserContext);

  type UserInfo = {
    createdAt: {seconds: number; nanoseconds: number};
    dateOfBirth: string;
    email: string;
    profileIcon: string;
    sex: string;
    termsOfUse: boolean;
    username: string;
  };

  const defaultState: UserInfo = {
    createdAt: {seconds: 0, nanoseconds: 0},
    dateOfBirth: 'Loading',
    email: 'Loading',
    profileIcon: 'Loading',
    sex: 'Loading',
    termsOfUse: true,
    username: 'Loading',
  };

  const [userInfo, setUserInfo] = useState<UserInfo>(defaultState);
  const {dateOfBirth, email, profileIcon, sex, username} = userInfo;
  useEffect(() => {
    window.history.pushState({}, '', '/profile');
    const getInfo = async (currentUser: User) => {
      const userData = await getUserInfo(currentUser);
      if (userData) {
        setUserInfo(userData.data() as UserInfo);
      }
    };
    if (currentUser) {
      getInfo(currentUser);
    }
  }, []);

  return (
    <>
      <Navbar />
      <MainContainer>
        <br></br>
        <TopContainer>
          <h1 style={{color: 'black'}}>{username}</h1>
          <Icon style={{margin: '0'}} src={profileIcon}></Icon>
        </TopContainer>
        <br />
        <MiddleContainer>
          <ul>
            <li>
              <strong>Sex: </strong>
              {sex}
            </li>
            <li>
              <strong>Email: </strong>
              {email}
            </li>
            <li>
              <strong>Date of Birth: </strong>
              {dateOfBirth}
            </li>
          </ul>
        </MiddleContainer>
      </MainContainer>
    </>
  );
};

export default Profile;
