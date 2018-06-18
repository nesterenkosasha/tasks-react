import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { postTasks } from './api';
import { validation, showDefaultTime } from './utils';
import './App.css';

class ModalWindow extends Component {
  constructor(props) {
    super(props);
    this.handelSubmit = this.handelSubmit.bind(this);
    this.handelCloseClick = this.handelCloseClick.bind(this);
  }

  handelCloseClick(e) {
    e.preventDefault();
    this.props.handelToggleModelWindow(false);
  }

  async handelSubmit(e) {
    try {
      const task = this.inputTask.value;
      const date = this.inputDate.value;
      e.preventDefault();
      if (validation(this.inputTask.value, this.inputDate.value)) {
        await postTasks({ task, date: Date.parse(date), expired: false })
          .then((data) => {
            if (data.status === 201) {
              return data.json();
            }
            return data;
          })
          .then((data) => {
            this.inputTask.value = '';
            this.props.handelToggleModelWindow(false);
            this.props.handleAddNewTask(data);
          });
      }
    } catch ({ message }) {
      console.error(message);
    }
  }


  render() {
    return (
      <div className="Modal-window">
        <form onSubmit={this.handelSubmit}>
          <h1>Task</h1>
          <input type="text" ref={(inp) => { this.inputTask = inp; }} name="task" className="input" placeholder="Task.." />
          <input type="text" ref={(inp) => { this.inputDate = inp; }} name="date" className="input" defaultValue={showDefaultTime()} />
          <br />
          <button className="input" onClick={this.handelCloseClick}>CLOSE</button>
          <button className="input">OK</button>
        </form>
      </div>
    );
  }
}

ModalWindow.propTypes = {
  handelToggleModelWindow: PropTypes.func.isRequired,
  handleAddNewTask: PropTypes.func.isRequired,
};


export default ModalWindow;
