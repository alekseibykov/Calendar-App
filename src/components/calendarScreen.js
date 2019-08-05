import React, { Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DatePicker from "react-datepicker";

import { addTask, removeTask, fetchToDos } from '../actions/actions';

class CalendarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
    };

    let rawData = this.props.data;
    let data = Object.keys(rawData).map(function(key) {
      return {key: key, data: rawData[key]};
    });

    let highlightedDates = [];
    data.map((el, index) => {
      let date = new Date(el.data.eventDate);
      highlightedDates.push(date)
    });

    this.highlightWithRanges = [
      { "react-datepicker__day--highlighted-custom-1": highlightedDates },
      { "react-datepicker__day--highlighted-custom-2": [
        new Date().addDays(4), ]
      }
    ];
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <div>
        <h1> Calendar Screen </h1>
        <DatePicker
          inline
          selected={this.state.startDate}
          onChange={this.handleChange.bind(this)}
          highlightDates={this.highlightWithRanges}
          placeholderText="This highlight two ranges with custom classes"
        />
        <br/>
        <br/>
        <nav>
          <Link to="/">Main </Link>
          <Link to="/calendar/">Calendar </Link>
          <Link to="/settings/">Settings</Link>
        </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
