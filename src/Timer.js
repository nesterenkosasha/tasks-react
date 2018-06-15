import React, { Component } from 'react';
import { showTimer } from './utils';
import './App.css';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.date,
    };
    console.log('propor', this.props);
  }

  componentDidMount() {
    this.interval = null;
    this.interval = setInterval(() => {
      if (this.state.time < Date.now()) {
        console.log('ff', this.interval);
        clearInterval(this.interval);
      } else {
        this.setState({ time: this.state.time - 100 });
      }
    }, 1000);
  }


  render() {
    const { time } = this.state;
    console.log(time);
    return (
      <div>{showTimer(time)}</div>
    );
  }
}

export default Timer;
