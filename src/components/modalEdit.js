import React, { Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactModal from 'react-modal';
import DatePicker from "react-datepicker";

import { changeTaskName, changeTaskDate } from '../actions/actions';

class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      startDate: '',
    };
  }

  handleInputChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleChangeName() {
    let currentTaskObject = {
      key: this.props.modalKey,
      name: this.state.name,
    }

    this.props.changeTaskName(currentTaskObject);
    this.props.handleCloseModal();
  }

  handleInputChange_2(date) {
    this.setState({
      startDate: date
    });
  }

  handleChangeDate() {
    let currentTaskObject = {
      key: this.props.modalKey,
      date: this.state.startDate,
    }

    this.props.changeTaskDate(currentTaskObject);
    this.props.handleCloseModal();
  }

  render() {
    let data = this.props.data;
    if (data === null) {
      data = [];
    }
    let el = document.getElementById("root");
    let date = new Date(this.state.startDate ?
            this.state.startDate :
            data[this.props.modalKey] ?
            data[this.props.modalKey].eventDate
            : '');
    return (
      <ReactModal
        isOpen={this.props.showModal}
        contentLabel="Minimal Modal Example"
        appElement={el}
        onRequestClose={this.props.handleCloseModal}
      >
        <button onClick={this.props.handleCloseModal}>Close Modal</button>
        <br />
        <br />
        <input
          onChange={this.handleInputChange.bind(this)}
          value={this.state.name ?
                this.state.name :
                data[this.props.modalKey] ?
                data[this.props.modalKey].name
                : ''}
          type="text"
          id="name"
          name="name"
        />
        <button onClick={this.handleChangeName.bind(this)}>Change name</button>
        <br />
        <br />
        <DatePicker
          selected={date}
          onChange={this.handleInputChange_2.bind(this)}
        />
      <button onClick={this.handleChangeDate.bind(this)}>Change date</button>
      </ReactModal>
    );
  }
}

const mapStateToProps = (state) => {
  const { data, dates } = state
  return { data, dates }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeTaskName,
    changeTaskDate,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit);
