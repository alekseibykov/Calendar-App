import React, { Component} from "react";
import { connect } from 'react-redux';
import TaskAdder from './taskAdder';

class EventList extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(eventDate) {
    this.props.removeTask(eventDate)
  }

  render() {
    let today = this.props.dates.today;
    let tomorrow = this.props.dates.tomorrow;
    let upcoming = this.props.dates.upcoming;

    // TODO NO items case
    let rawData = this.props.data;
    let data = Object.keys(rawData).map(function(key) {
      return {key: key, data: rawData[key]};
    })

    let todayList = data.map((el, index) => {
      let date = new Date(el.data.eventDate);
      if (date >= today && date <= tomorrow) {
        return (
          <li key={el.key}>
            {el.data.name + ' '}
            <button onClick={() => this.handleRemove(el.key)} type="button">Remove</button>
          </li>
        );
      }
      return null;
    });

    let tomorrowList = data.map((el, index) => {
      let date = new Date(el.data.eventDate);
      if (date >= tomorrow && date <= upcoming) {
        return (
          <li key={el.key}>
            {el.data.name + ' '}
            <button onClick={() => this.handleRemove(el.key)} type="button">Remove</button>
          </li>
        );
      }
      return null;
    });

    // TODO upcoming should be no date insted of today + 2
    let upcomingList = data.map((el, index) => {
      let date = new Date(el.data.eventDate);
      if (date >= upcoming) {
        return (
          <li key={el.key}>
            {el.data.name + ' '}
            <button onClick={() => this.handleRemove(el.key)} type="button">Remove</button>
          </li>
        );
      }
      return null;
    });

    return (
      <div className="List">
        Today <TaskAdder day="today" />
        <ul>
          {todayList}
        </ul>
        Tomorrow <TaskAdder day="tomorrow" />
        <ul>
          {tomorrowList}
        </ul>
        Upcoming <TaskAdder day="upcoming" />
        <ul>
          {upcomingList}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { data, dates } = state
  return { data, dates }
};

export default connect(mapStateToProps)(EventList);
