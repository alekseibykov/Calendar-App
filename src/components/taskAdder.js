import React, { Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addTask, removeTask } from '../actions/actions';

class TaskAdder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddToday: false,
      nameAddToday: '',
    };
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
    let eventDate;
    if (this.props.day instanceof Date) {
      eventDate = this.props.day;
    }
    if (this.props.day === 'today') {
      eventDate = new Date();
    }
    if (this.props.day === 'tomorrow') {
      eventDate = new Date().addDays(1);
    }
    if (this.props.day === 'upcoming') {
      eventDate = new Date().addDays(2);
    }
    this.props.addTask({name: this.state.nameAddToday, startDate: eventDate, uid: this.props.sessionState.authUser.uid});
    this.setState({
      showAddToday: false,
      nameAddToday: '',
    });
  }

  render() {
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

    return (
      <span>
        {renderAddTodayTask}
      </span>
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
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TaskAdder);
