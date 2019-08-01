import React, { Component} from "react";

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

  handleClick(e) {
    e.preventDefault();
    this.setState({
      showAddToday: true,
    });
  }

  handleClick_2(e) {
    e.preventDefault();
    this.setState({
      showAddToday: false,
    });
  }

  handleClick_3(e) {
    this.setState({
      nameAddToday: e.target.value
    });
  }

  handleClick_4() {
    this.setState({
      data: [
        {
          name: this.state.nameAddToday,
          eventDate: new Date(),
        },
        ...this.state.data
      ],
      showAddToday: false,
      nameAddToday: '',
    });
  }

  handleClick_5(e) {
    e.preventDefault();
    this.setState({
      showAddTomorrow: true,
    });
  }

  handleClick_6(e) {
    e.preventDefault();
    this.setState({
      showAddTomorrow: false,
    });
  }

  handleClick_7(e) {
    this.setState({
      nameAddTomorrow: e.target.value
    });
  }

  handleClick_8() {
    this.setState({
      data: [
        {
          name: this.state.nameAddTomorrow,
          eventDate: new Date().addDays(1),
        },
        ...this.state.data
      ],
      showAddTomorrow: false,
      nameAddTomorrow: '',
    });
  }

  handleClick_9(e) {
    e.preventDefault();
    this.setState({
      showAddUpcoming: true,
    });
  }

  handleClick_10(e) {
    e.preventDefault();
    this.setState({
      showAddUpcoming: false,
    });
  }

  handleClick_11(e) {
    this.setState({
      nameAddUpcoming: e.target.value
    });
  }

  handleClick_12() {
    this.setState({
      data: [
        {
          name: this.state.nameAddUpcoming,
          eventDate: new Date().addDays(2),
        },
        ...this.state.data
      ],
      showAddUpcoming: false,
      nameAddUpcoming: '',
    });
  }

  handleClick_13(eventDate) {
    let newData = [];
    this.state.data.forEach((el) => {
      if (el.eventDate !== eventDate) {
        newData.push(el);
      }
    })
    this.setState({
      data: newData,
    });
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

    let renderAddTodayTask;
    if (this.state.showAddToday) {
      renderAddTodayTask = (
        <span>
          <input
            onChange={this.handleClick_3.bind(this)}
            value={this.state.nameAddToday}
            type="text"
            id="nameAddToday"
            name="nameAddToday"
          />
        <button onClick={this.handleClick_4.bind(this)} type="button">Add</button>
        <button onClick={this.handleClick_2.bind(this)} type="button">Cancel</button>
        </span>
      );
    } else {
      renderAddTodayTask = (
        <button onClick={this.handleClick.bind(this)} type="button">Add</button>
      );
    }

    let renderAddTomorrowTask;
    if (this.state.showAddTomorrow) {
      renderAddTomorrowTask = (
        <span>
          <input
            onChange={this.handleClick_7.bind(this)}
            value={this.state.nameAddTomorrow}
            type="text"
            id="nameAddTomorrow"
            name="nameAddTomorrow"
          />
        <button onClick={this.handleClick_8.bind(this)} type="button">Add</button>
        <button onClick={this.handleClick_6.bind(this)} type="button">Cancel</button>
        </span>
      );
    } else {
      renderAddTomorrowTask = (
        <button onClick={this.handleClick_5.bind(this)} type="button">Add</button>
      );
    }

    let renderAddUpcomingTask;
    if (this.state.showAddUpcoming) {
      renderAddUpcomingTask = (
        <span>
          <input
            onChange={this.handleClick_11.bind(this)}
            value={this.state.nameAddUpcoming}
            type="text"
            id="nameAddUpcoming"
            name="nameAddUpcoming"
          />
        <button onClick={this.handleClick_12.bind(this)} type="button">Add</button>
        <button onClick={this.handleClick_10.bind(this)} type="button">Cancel</button>
        </span>
      );
    } else {
      renderAddUpcomingTask = (
        <button onClick={this.handleClick_9.bind(this)} type="button">Add</button>
      );
    }

    return (
      <div className="List">
        Today {renderAddTodayTask}
        <ul>
          {todayList}
        </ul>
        Tomorrow {renderAddTomorrowTask}
        <ul>
          {tomorrowList}
        </ul>
        Upcoming {renderAddUpcomingTask}
        <ul>
          {upcomingList}
        </ul>
      </div>
    );
  }
}

export default EventList;
