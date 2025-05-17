import React, { Component} from "react";
import { connect } from 'react-redux';
import { getISODateString } from '../reducers/datesReducer';
import TaskAdder from './TaskAdder';
import ModalEdit from './ModalEdit';

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalKey: '',
    };

    this.handleRemove = this.handleRemove.bind(this);
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

  render() {
    let today = this.props.dates.today;
    let tomorrow = this.props.dates.tomorrow;
    let upcoming = this.props.dates.upcoming;

    let rawData = this.props.data;
    let data = [];
    if (rawData !== null) {
      data = Object.keys(rawData).map(function(key) {
        return {key: key, data: rawData[key]};
      })
    }

    let uid = this.props.sessionState.authUser.uid;

    let todayList = data.map((el, index) => {
      let date = getISODateString(new Date(el.data.eventDate));
      if (date >= today && date < tomorrow) {
        return (
          <li className="task_item" key={el.key}>
            <span onClick={() => this.handleOpenModal(el.key)}>
              {el.data.name + ' '}
            </span>
            <button onClick={() => this.handleRemove(el.key, uid)} type="button">Remove</button>
          </li>
        );
      }
      return null;
    });

    let tomorrowList = data.map((el, index) => {
      let date = getISODateString(new Date(el.data.eventDate));
      if (date >= tomorrow && date < upcoming) {
        return (
          <li className="task_item" key={el.key}>
            <span onClick={() => this.handleOpenModal(el.key)}>
              {el.data.name + ' '}
            </span>
            <button onClick={() => this.handleRemove(el.key, uid)} type="button">Remove</button>
          </li>
        );
      }
      return null;
    });

    // TODO upcoming should be no date insted of today + 2
    let upcomingList = data.map((el, index) => {
      let date = getISODateString(new Date(el.data.eventDate));
      if (date >= upcoming) {
        return (
          <li className="task_item" key={el.key}>
            <span onClick={() => this.handleOpenModal(el.key)}>
              {el.data.name + ' '}
            </span>
            <button onClick={() => this.handleRemove(el.key, uid)} type="button">Remove</button>
          </li>
        );
      }
      return null;
    });

    return (
      <div className="List">
        <ModalEdit
          handleOpenModal={this.handleOpenModal}
          handleCloseModal={this.handleCloseModal}
          showModal={this.state.showModal}
          modalKey={this.state.modalKey}
        />
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
  const { data, dates, sessionState } = state
  return { data, dates, sessionState }
};

export default connect(mapStateToProps)(EventList);
