import {User} from 'firebase/auth';
import {createContext, FC, useState} from 'react';

interface UserContextType {
  currentUser: null | User;
  setCurrentUser: React.Dispatch<React.SetStateAction<null | User>>;
}

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => null,
});

interface Props {
  children: React.ReactNode;
}

export const UserProvider: FC<Props> = ({children}) => {
  const [currentUser, setCurrentUser] = useState<null | User>(null);
  const value = {currentUser, setCurrentUser};
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
