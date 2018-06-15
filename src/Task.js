import React, { Component } from 'react';
import Timer from './Timer';
// import { renderTimer } from './utils';
import './App.css';

class Task extends Component {
  constructor(props) {
    super(props);
    console.log('propor', this.props);
  }

  handelAddNewExpiredTask() {
    console.log('nnnnnnnn', this.props);
    this.props.handelAddNewExpiredTask(this.props.task);
  }

  render() {
    const { task, date, id, handelDeleteTaskClick } = this.props;
    return (
      <div className="Task">
        <div className="Task-text">{task}</div>
        <div className="Task-text"><Timer date={date} handelAddNewExpiredTask={this.handelAddNewExpiredTask} /></div>
        <button className="Hidden-btn" onClick={() => handelDeleteTaskClick(id)}>Delete</button>
      </div>
    );
  }
}

export default Task;
