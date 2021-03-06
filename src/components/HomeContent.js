import React, { Component} from "react";
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as firebase from "firebase/app";
import "firebase/auth";

import { addTask, removeTask, fetchToDos } from '../actions/actions';
import EventList from './EventList';
import Footer from './Footer';

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
    this.props.fetchToDos(uid);
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
      name: '',
    });
  }

  handleClick_2(key, uid) {
    this.props.removeTask(key, uid);
  }

  render() {
    return (
      <div className="App">
        <h1>
          Calendar App
          <button onClick={() => firebase.auth().signOut()}>
            Log Out
          </button>
        </h1>
        <h4>
          Current user: {this.props.sessionState.authUser.email}
        </h4>

        <EventList removeTask={this.handleClick_2.bind(this)} />
        <br/>
        <input
          onChange={this.handleInputChange.bind(this)}
          value={this.state.name}
          type="text"
          id="name"
          name="name"
        />
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange.bind(this)}
        />
        <button onClick={this.handleClick.bind(this)} type="button">Add</button>
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
