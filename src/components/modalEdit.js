import React, { Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactModal from 'react-modal';

import { changeTaskName } from '../actions/actions';

class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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

  render() {
    console.log(this.props);
    let el = document.getElementById("root");
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
          value={this.state.name ? this.state.name : this.props.data[this.props.modalKey] ? this.props.data[this.props.modalKey].name : ''}
          type="text"
          id="name"
          name="name"
        />
        <button onClick={this.handleChangeName.bind(this)}>Change name</button>

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
    changeTaskName
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit);
