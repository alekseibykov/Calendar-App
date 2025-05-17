import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../App';
import { onAuthStateChanged } from "firebase/auth";

// Helper function to create a serializable user object
const createSerializableAuthUser = (firebaseUser) => {
  if (!firebaseUser) return null;
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    emailVerified: firebaseUser.emailVerified,
    // Add any other primitive properties you need
  };
};

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      const storedAuthUserString = localStorage.getItem('authUser');
      if (storedAuthUserString) {
        try {
          // The stored object is already serializable
          this.props.onSetAuthUser(JSON.parse(storedAuthUserString));
        } catch (error) {
          console.error("Error parsing authUser from localStorage:", error);
          localStorage.removeItem('authUser');
          this.props.onSetAuthUser(null);
        }
      } else {
        this.props.onSetAuthUser(null); // Dispatch null if nothing is stored
      }
    }

    componentDidMount() {
      this.listener = onAuthStateChanged(auth,
        firebaseUser => {
          const serializableUser = createSerializableAuthUser(firebaseUser);
          if (serializableUser) {
            localStorage.setItem('authUser', JSON.stringify(serializableUser));
            this.props.onSetAuthUser(serializableUser);
          } else {
            localStorage.removeItem('authUser');
            this.props.onSetAuthUser(null);
          }
        },
        error => {
          console.error("Firebase onAuthStateChanged error:", error);
          localStorage.removeItem('authUser');
          this.props.onSetAuthUser(null);
        },
      );
    }

    componentWillUnmount() {
      if (this.listener) {
        this.listener();
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser =>
      dispatch({ type: 'AUTH_USER_SET', authUser }),
  });

  return connect(null, mapDispatchToProps)(WithAuthentication);
};

export default withAuthentication;
