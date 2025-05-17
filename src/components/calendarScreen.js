import React, { Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

import { addTask, removeTask, fetchToDos } from '../actions/actions';
import DayTasks from './DayTasks';

class CalendarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
    };
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    let rawData = this.props.data;
    let data = [];
    if (rawData !== null) {
      data = Object.keys(rawData).map(function(key) {
        return {key: key, data: rawData[key]};
      })
    }

    let highlightedDates = [];
    data.map((el, index) => {
      let date = new Date(el.data.eventDate);
      highlightedDates.push(date)
    });

    this.highlightWithRanges = [
      { "react-datepicker__day--highlighted-custom-1": highlightedDates },
    ];
    return (
      <div>
        <h1> Calendar Screen </h1>
        <DatePicker
          inline
          selected={this.state.startDate}
          onChange={this.handleChange.bind(this)}
          highlightDates={this.highlightWithRanges}
        />
        <DayTasks startDate={this.state.startDate} />
        <br/>
        <br/>
        <nav>
          <Link to="/">Main </Link>
          <br />
          <Link to="/calendar/">Calendar </Link>
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
