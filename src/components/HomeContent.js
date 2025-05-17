import React, { Component} from "react";
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { auth } from '../App.js';
import { signOut } from "firebase/auth";

import { addTask, removeTask, fetchToDos } from '../actions/actions.js';
import EventList from './EventList.js';
import Footer from './Footer.js';

import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

class HomeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      name: 'Add task here',
    };
  }

  componentDidMount() {
    let uid = null;
    if (this.props.sessionState.authUser) {
      uid = this.props.sessionState.authUser.uid;
    }
    if (uid) {
      this.props.fetchToDos(uid);
    } else {
      console.log("HomeContent: No authenticated user found on mount to fetch todos for.");
    }
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleInputChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleClick(e) {
    if (!this.props.sessionState.authUser) {
      console.error("Cannot add task: User not authenticated.");
      return;
    }
    let d = this.state.startDate;
    let nd = new Date();
    let dateId = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      nd.getHours(),
      nd.getMinutes(),
      nd.getSeconds(),
      nd.getMilliseconds()
    );
    this.props.addTask({
      name: this.state.name,
      startDate: dateId,
      uid: this.props.sessionState.authUser.uid
    });
    this.setState({
      name: ''
    });
  }

  handleClick_2(key, uid) {
    if (!this.props.sessionState.authUser || this.props.sessionState.authUser.uid !== uid) {
       console.error("Cannot remove task: User not authenticated or UID mismatch.");
      return;
    }
    this.props.removeTask(key, uid);
  }
  
  handleSignOut() {
    signOut(auth).then(() => {
      console.log("User signed out successfully.");
    }).catch((error) => {
      console.error("Sign out error:", error);
    });
  }

  render() {
    const userEmail = this.props.sessionState.authUser ? this.props.sessionState.authUser.email : 'Guest';

    return (
      <div className="App">
        <h1>
          Calendar App
          {this.props.sessionState.authUser && (
            <button onClick={this.handleSignOut.bind(this)}>
              Log Out
            </button>
          )}
        </h1>
        <h4>
          Current user: {userEmail}
        </h4>

        {this.props.sessionState.authUser ? (
          <>
            <EventList removeTask={this.handleClick_2.bind(this)} />
            <br/>
            <input
              onChange={this.handleInputChange.bind(this)}
              value={this.state.name}
              type="text"
              id="name"
              name="name"
              placeholder="Add task here"
            />
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange.bind(this)}
            />
            <button onClick={this.handleClick.bind(this)} type="button">Add</button>
          </>
        ) : (
          <p>Please log in to manage your tasks.</p>
        )}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { data, sessionState } = state
  return { data, sessionState }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addTask,
    removeTask,
    fetchToDos,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);
