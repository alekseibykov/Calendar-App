import React, { Component } from 'react';
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ContentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { show: null };
  }

  renderDescription(item) {
    if (this.props.show.show === item.id) {
      return <div>{item.description}</div>;
    }
    return null;
  }

  render() {
    return (
      <div>
        Here was a list

        <button onClick={() => firebase.auth().signOut()}>
          Log Out
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { content, show } = state
  return { content, show }
};


export default connect(mapStateToProps)(ContentScreen);
