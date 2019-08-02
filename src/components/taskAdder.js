import React, { Component} from "react";

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
    this.props.handleClick_44(this.state.nameAddToday, this.props.day);
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

export default TaskAdder;
