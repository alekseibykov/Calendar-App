import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../App.js';
import { onAuthStateChanged } from "firebase/auth";
import { setAuthUser, clearAuthUser } from '../reducers/sessionSlice.js';

// Helper function to create a serializable user object
const createSerializableAuthUser = (firebaseUser) => {
  if (!firebaseUser) return null;
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    emailVerified: firebaseUser.emailVerified,
  };
};

const withAuthentication = Component => {
  const WithAuthenticationComponent = props => {
    const dispatch = useDispatch();
    // Ref to store the stringified user object dispatched from localStorage initially,
    // or a special marker like 'null' if no user/cleared, or 'processed_by_firebase' after first Firebase event.
    const dispatchedFromLocalStatusRef = useRef(null);

    useEffect(() => {
      // --- Step 1: Synchronous initial dispatch from localStorage to prevent flicker ---
      // This block runs only if dispatchedFromLocalStatusRef.current is null (initial mount)
      if (dispatchedFromLocalStatusRef.current === null) {
        const storedAuthUserString = localStorage.getItem('authUser');
        if (storedAuthUserString) {
          try {
            const user = JSON.parse(storedAuthUserString);
            dispatch(setAuthUser(user));
            dispatchedFromLocalStatusRef.current = storedAuthUserString;
          } catch (error) {
            console.error("Error parsing authUser from localStorage on init:", error);
            localStorage.removeItem('authUser');
            dispatch(clearAuthUser());
            dispatchedFromLocalStatusRef.current = 'null'; // Indicates cleared state due to error
          }
        } else {
          dispatch(clearAuthUser());
          dispatchedFromLocalStatusRef.current = 'null'; // Indicates no user in localStorage
        }
      }

      // --- Step 2: Firebase listener ---
      const listener = onAuthStateChanged(auth,
        firebaseUser => {
          const serializableUser = createSerializableAuthUser(firebaseUser);
          const firebaseUserString = serializableUser ? JSON.stringify(serializableUser) : 'null';

          // If this is the first Firebase event after initial localStorage check
          if (dispatchedFromLocalStatusRef.current !== 'processed_by_firebase') {
            if (firebaseUserString === dispatchedFromLocalStatusRef.current) {
              // Firebase state matches what was dispatched from localStorage.
              // No need to dispatch again. Just ensure localStorage is consistent if user exists.
              if (serializableUser) {
                localStorage.setItem('authUser', JSON.stringify(serializableUser));
              } else {
                localStorage.removeItem('authUser');
              }
              dispatchedFromLocalStatusRef.current = 'processed_by_firebase';
              return; // Stop here for this first identical event
            }
          }

          // Subsequent Firebase events, or if the first event differed from localStorage
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
          dispatchedFromLocalStatusRef.current = 'processed_by_firebase'; // Mark as processed on error too
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
