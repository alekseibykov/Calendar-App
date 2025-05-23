import "firebase/database";
import "firebase/auth";
import { useSelector } from 'react-redux';

import type { RootState } from '../index';

import LoginForm from './LoginForm';
import HomeContent from './HomeContent';

const HomeScreen = () => {
  const authUser = useSelector((state: RootState) => state.sessionState.authUser);

  return (
    <div>
      {authUser ? <HomeContent /> : <LoginForm />}
    </div>
  );
};

export default HomeScreen;
