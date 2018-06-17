import React, { Component } from 'react';
import Timer from './Timer';
import './App.css';

class Task extends Component {
  constructor(props) {
    super(props);
    this.handelChangeTaskOnExpired = this.handelChangeTaskOnExpired.bind(this);
  }

  handelChangeTaskOnExpired() {
    this.props.handelChangeTaskOnExpired(this.props.id);
  }

  render() {
    const { task, date, id, handelDeleteTaskClick } = this.props;
    return (
      <div className="Task">
        <div className="Task-text">{task}</div>
        <div className="Task-text"><Timer date={date} handelChangeTaskOnExpired={this.handelChangeTaskOnExpired} /></div>
        <button className="Hidden-btn" onClick={() => handelDeleteTaskClick(id)}>Delete</button>
      </div>
    );
  }
}

export default Task;
