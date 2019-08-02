import React, { Component} from "react";
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
      data: [],
      showAddToday: false,
      nameAddToday: '',
      showAddTomorrow: false,
      nameAddTomorrow: '',
      showAddUpcoming: false,
      nameAddUpcoming: '',
    };

    this.handleClick_13 = this.handleClick_13.bind(this);
  }

  handleClick_44(name, day) {
    let eventDate;
    if (day === 'today') {
      eventDate = new Date();
    }
    if (day === 'tomorrow') {
      eventDate = new Date().addDays(1);
    }
    if (day === 'upcoming') {
      eventDate = new Date().addDays(2);
    }
    this.setState({
      data: [
        {
          name: name,
          eventDate: eventDate,
        },
        ...this.state.data
      ],
    });
  }

  handleClick_13(eventDate) {
    let newData = [];
    this.state.data.forEach((el) => {
      if (el.eventDate !== eventDate) {
        newData.push(el);
      }
    })
    this.setState({data: newData}, this.props.removeTask(eventDate));
  }

  render() {
    let today = this.state.today;
    let tomorrow = this.state.tomorrow;
    let upcoming = this.state.upcoming;

    let fullData = [ ...this.props.data, ...this.state.data ]

    let todayList = fullData.map((el, index) => {
      if (el.eventDate >= today && el.eventDate <= tomorrow) {
        return (
          <li key={index}>
            {el.name} <button onClick={() => this.handleClick_13(el.eventDate)} type="button">Remove</button>
          </li>
        );
      }
      return null;
    });

    let tomorrowList = fullData.map((el, index) => {
      if (el.eventDate >= tomorrow && el.eventDate <= upcoming) {
        return (
          <li key={index}>
            {el.name} <button onClick={() => this.handleClick_13(el.eventDate)} type="button">Remove</button>
          </li>
        );
      }
      return null;
    });

    let upcomingList = fullData.map((el, index) => {
      if (el.eventDate >= upcoming) {
        return (
          <li key={index}>
            {el.name} <button onClick={() => this.handleClick_13(el.eventDate)} type="button">Remove</button>
          </li>
        );
      }
      return null;
    });

    return (
      <div className="List">
        Today <TaskAdder
                day="today"
                handleClick_44={this.handleClick_44.bind(this)}
              />
        <ul>
          {todayList}
        </ul>
        Tomorrow <TaskAdder
                  day="tomorrow"
                  handleClick_44={this.handleClick_44.bind(this)}
                />
        <ul>
          {tomorrowList}
        </ul>
        Upcoming <TaskAdder
                  day="upcoming"
                  handleClick_44={this.handleClick_44.bind(this)}
                />
        <ul>
          {upcomingList}
        </ul>
      </div>
    );
  }
}

export default EventList;
