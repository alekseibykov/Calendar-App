import React from 'react';
import { connect } from 'react-redux';
// import { compose } from 'redux'; // compose seems unused
import { auth } from '../../App'; // Adjusted path
import { onAuthStateChanged } from "firebase/auth";

// Firebase config and initialization removed

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      const storedAuthUser = localStorage.getItem('authUser');
      if (storedAuthUser) {
        try {
          this.props.onSetAuthUser(JSON.parse(storedAuthUser));
        } catch (error) {
          console.error("Error parsing authUser from localStorage:", error);
          localStorage.removeItem('authUser');
          this.props.onSetAuthUser(null);
        }
      } else {
        this.props.onSetAuthUser(null);
      }
    }

    componentDidMount() {
      this.listener = onAuthStateChanged(auth,
        authUser => {
          if (authUser) {
            localStorage.setItem('authUser', JSON.stringify(authUser));
            this.props.onSetAuthUser(authUser);
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
