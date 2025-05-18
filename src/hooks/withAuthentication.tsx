import React, {ComponentType, FC, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../App';
import {onAuthStateChanged, User} from "firebase/auth";
import {clearAuthUser, setAuthUser} from '../reducers/sessionSlice';
import {AppDispatch} from '../index';

// Define a serializable user structure
interface SerializableAuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  // Add any other properties you need from the Firebase user object
}

// Helper function to create a serializable user object
const createSerializableAuthUser = (firebaseUser: User | null): SerializableAuthUser | null => {
  if (!firebaseUser) return null;
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    emailVerified: firebaseUser.emailVerified,
  };
};

const withAuthentication = <P extends object>(Component: ComponentType<P>): FC<P> => {
  return (props: P) => {
    const dispatch = useDispatch<AppDispatch>();
    // Ref to store the stringified user object dispatched from localStorage initially,
    // or a special marker like 'null' if no user/cleared, or 'processed_by_firebase' after first Firebase event.
    const dispatchedFromLocalStatusRef = useRef<string | null>(null);

    useEffect(() => {
      // --- Step 1: Synchronous initial dispatch from localStorage to prevent flicker ---
      if (dispatchedFromLocalStatusRef.current === null) {
        const storedAuthUserString = localStorage.getItem('authUser');
        if (storedAuthUserString) {
          try {
            const user: SerializableAuthUser = JSON.parse(storedAuthUserString);
            dispatch(setAuthUser(user));
            dispatchedFromLocalStatusRef.current = storedAuthUserString; // Store the string version
          } catch (error) {
            console.error("Error parsing authUser from localStorage on init:", error);
            localStorage.removeItem('authUser');
            dispatch(clearAuthUser());
            dispatchedFromLocalStatusRef.current = 'null'; // String literal 'null'
          }
        } else {
          dispatch(clearAuthUser());
          dispatchedFromLocalStatusRef.current = 'null'; // String literal 'null'
        }
      }

      // --- Step 2: Firebase listener ---
      const listener = onAuthStateChanged(auth,
          firebaseUser => {
            const serializableUser = createSerializableAuthUser(firebaseUser);
            const firebaseUserString = serializableUser ? JSON.stringify(serializableUser) : 'null'; // String literal 'null' or JSON string

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
          listener(); // Unsubscribe
        }
      };
    }, [dispatch]);

    return <Component {...props} />;
  };
};

export default withAuthentication;
