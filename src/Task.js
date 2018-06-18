import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const {
      task, date, id, expired, handelDeleteTaskClick,
    } = this.props;
    return (
      <div className="Task">
        <div className="Task-text">{task}</div>
        <div className="Task-text">
          {
            expired
              ? <div>0: 0: 0</div>
              : <Timer
                date={date}
                expired={expired}
                handelChangeTaskOnExpired={this.handelChangeTaskOnExpired}
              />
          }
        </div>
        <button className="Hidden-btn" onClick={() => handelDeleteTaskClick(id)}>Delete</button>
      </div>
    );
  }
}

Task.propTypes = {
  handelChangeTaskOnExpired: PropTypes.func.isRequired,
  handelDeleteTaskClick: PropTypes.func.isRequired,
  task: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  expired: PropTypes.bool.isRequired,
};


export default Task;
