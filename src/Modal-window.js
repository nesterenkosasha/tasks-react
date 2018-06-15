import React, { Component } from 'react';
import { postTasks } from './api';
import { validation } from './utils';
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
      console.log(task, date);
      e.preventDefault();
      if (validation(this.inputTask.value, this.inputDate.value)) {
        await postTasks({ task, date: Date.parse(date) })
          .then((data) => {
            if (data.status === 201) {
              return data.json();
            }
            return data;
          })
          .then((data) => {
            console.log(data);
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
          <input type="text" ref={(inp) => { this.inputDate = inp; }} name="date" className="input" defaultValue="2018-06-16 20:20" />
          <br />
          <button className="input" onClick={this.handelCloseClick}>CLOSE</button>
          <button className="input">OK</button>
        </form>
      </div>
    );
  }
}

export default ModalWindow;
