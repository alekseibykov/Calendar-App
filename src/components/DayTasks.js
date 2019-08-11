import React, { Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { addTask, removeTask } from '../actions/actions';
import TaskAdder from './TaskAdder';
import ModalEdit from './ModalEdit';

class DayTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalKey: '',
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleRemove(key, uid) {
    this.props.removeTask(key, uid)
  }

  handleOpenModal(key) {
    this.setState({ showModal: true, modalKey: key });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  renderTasks() {
    let {startDate} = this.props;
    let rawData = this.props.data;
    let data = [];
    if (rawData !== null) {
      data = Object.keys(rawData).map(function(key) {
        return {key: key, data: rawData[key]};
      })
    }
    let today = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
    let tomorrow = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).addDays(1)

    return data.map((el, index) => {
      let date = new Date(el.data.eventDate);
      if (date >= today && date <= tomorrow) {
        return (
          <li className="task_item" key={el.key}>
            <span onClick={() => this.handleOpenModal(el.key)}>
              {el.data.name + ' '}
            </span>
            <button onClick={() => this.handleRemove(el.key, this.props.sessionState.authUser.uid)} type="button">Remove</button>
          </li>
        );
      }
      return null;
    });
  }

  render() {
    return (
      <div>
        <h2>
          Tasks for this day <TaskAdder day={this.props.startDate} />
        </h2>
        <ModalEdit
          handleOpenModal={this.handleOpenModal}
          handleCloseModal={this.handleCloseModal}
          showModal={this.state.showModal}
          modalKey={this.state.modalKey}
        />
        {this.renderTasks()}
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  const { data, dates, sessionState } = state
  return { data, dates, sessionState }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addTask,
    removeTask,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DayTasks);
