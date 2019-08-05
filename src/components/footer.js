import React, { Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { addTask, removeTask } from '../actions/actions';

class Footer extends Component {

  render() {
    return (
      <nav>
        <br/>
        <Link to="/">Main </Link>
        <br />
        <Link to="/calendar/">Calendar </Link>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  const { data } = state
  return { data }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addTask,
    removeTask,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
