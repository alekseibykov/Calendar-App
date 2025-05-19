import "firebase/database";
import "firebase/auth";
import { useSelector } from 'react-redux';

import LoginForm from './LoginForm';
import HomeContent from './HomeContent';
import type { RootState } from '../index';

const HomeScreen = () => {
  const authUser = useSelector((state: RootState) => state.sessionState.authUser);

  return (
    <div>
      {authUser ? <HomeContent /> : <LoginForm />}
    </div>
  );
};

export default HomeScreen;
