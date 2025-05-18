import React, { useEffect, useRef, ComponentType, FC } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../App';
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { setAuthUser, clearAuthUser } from '../reducers/sessionSlice';
import { AppDispatch } from '../index';

// Define a serializable user structure
interface SerializableAuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
}

// Helper function to create a serializable user object
const createSerializableAuthUser = (firebaseUser: FirebaseUser | null): SerializableAuthUser | null => {
  if (!firebaseUser) return null;
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    emailVerified: firebaseUser.emailVerified,
  };
};

const withAuthentication = <P extends object>(Component: ComponentType<P>): FC<P> => {
  const WithAuthenticationComponent: FC<P> = (props: P) => {
    const dispatch = useDispatch<AppDispatch>();
    const dispatchedFromLocalStatusRef = useRef<string | null>(null);

    useEffect(() => {
      if (dispatchedFromLocalStatusRef.current === null) {
        const storedAuthUserString = localStorage.getItem('authUser');
        if (storedAuthUserString) {
          try {
            const user = JSON.parse(storedAuthUserString) as SerializableAuthUser;
            dispatch(setAuthUser(user));
            dispatchedFromLocalStatusRef.current = storedAuthUserString;
          } catch (error) {
            console.error("Error parsing authUser from localStorage on init:", error);
            localStorage.removeItem('authUser');
            dispatch(clearAuthUser());
            dispatchedFromLocalStatusRef.current = 'null';
          }
        } else {
          dispatch(clearAuthUser());
          dispatchedFromLocalStatusRef.current = 'null';
        }
      }

      const listener = onAuthStateChanged(auth,
        firebaseUser => {
          const serializableUser = createSerializableAuthUser(firebaseUser);
          const firebaseUserString = serializableUser ? JSON.stringify(serializableUser) : 'null';

          if (dispatchedFromLocalStatusRef.current !== 'processed_by_firebase') {
            if (firebaseUserString === dispatchedFromLocalStatusRef.current) {
              if (serializableUser) {
                localStorage.setItem('authUser', JSON.stringify(serializableUser));
              } else {
                localStorage.removeItem('authUser');
              }
              dispatchedFromLocalStatusRef.current = 'processed_by_firebase';
              return;
            }
          }

          if (serializableUser) {
            localStorage.setItem('authUser', JSON.stringify(serializableUser));
            dispatch(setAuthUser(serializableUser));
          } else {
            localStorage.removeItem('authUser');
            dispatch(clearAuthUser());
          }
          dispatchedFromLocalStatusRef.current = 'processed_by_firebase';
        },
        error => {
          console.error("Firebase onAuthStateChanged error:", error);
          localStorage.removeItem('authUser');
          dispatch(clearAuthUser());
          dispatchedFromLocalStatusRef.current = 'processed_by_firebase';
        },
      );

      return () => {
        if (listener) {
          listener();
        }
      };
    }, [dispatch]);

    return <Component {...props} />;
  };

  return WithAuthenticationComponent;
};

export default withAuthentication;
