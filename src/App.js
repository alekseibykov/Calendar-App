import React, { Component} from "react";
import {hot} from "react-hot-loader";
import DatePicker from "react-datepicker";

import EventList from './components/eventList';

import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      name: 'yyyy',
      data: [],
    };
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
    e.preventDefault();
    this.setState({
      data: [
        ...this.state.data,
        {
          name: this.state.name,
          eventDate: this.state.startDate,
        }
      ],
      name: '',
    });
  }

  render() {
    return (
      <div className="App">
        <h1> Calendar App </h1>
        <EventList data={this.state.data} />
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
      </div>
    );
  }
}

export default hot(module)(App);
