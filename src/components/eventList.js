import React, { Component} from "react";
import { connect } from 'react-redux';
import TaskAdder from './taskAdder';

class EventList extends Component {
  constructor(props) {
    super(props);

    Date.prototype.addDays = function(days) {
      let date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }

    this.state = {
      today: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
      tomorrow: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).addDays(1),
      upcoming: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).addDays(2),
    };

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(eventDate) {
    this.props.removeTask(eventDate)
  }

  render() {
    let today = this.state.today;
    let tomorrow = this.state.tomorrow;
    let upcoming = this.state.upcoming;

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
            <button onClick={() => this.handleRemove(date)} type="button">Remove</button>
          </li>
        );
      }
      return null;
    });

    let tomorrowList = data.map((el, index) => {
      let date = new Date(el.data.eventDate);
      if (date >= tomorrow && date <= upcoming) {
        return (
          <li key={index}>
            {el.data.name + ' '}
            <button onClick={() => this.handleRemove(date)} type="button">Remove</button>
          </li>
        );
      }
      return null;
    });

    let upcomingList = data.map((el, index) => {
      let date = new Date(el.data.eventDate);
      if (date >= upcoming) {
        return (
          <li key={index}>
            {el.data.name + ' '}
            <button onClick={() => this.handleRemove(date)} type="button">Remove</button>
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
  const { data } = state
  return { data }
};

export default connect(mapStateToProps)(EventList);
