import React, { Component} from "react";
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addTask, removeTask, fetchToDos } from '../actions/actions';
import EventList from './eventList';
import Footer from './footer';

import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      name: 'Add task here',
    };
  }

  componentDidMount() {
    this.props.fetchToDos();
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
    this.props.addTask({ name: this.state.name, startDate: dateId});
    this.setState({
      name: '',
    });
  }

  handleClick_2(eventDate) {
    this.props.removeTask(eventDate);
  }

  render() {
    return (
      <div className="App">
        <h1> Calendar App </h1>
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
  const { data } = state
  return { data }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addTask,
    removeTask,
    fetchToDos,
  }, dispatch)
);

// export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

import { withRouter } from 'react-router-dom'
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainScreen))
