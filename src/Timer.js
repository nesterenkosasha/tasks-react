import React, { Component } from 'react';
import { showTimer } from './utils';
import './App.css';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.date,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.time < Date.now()) {
        clearInterval(this.interval);
        this.props.handelChangeTaskOnExpired()
      } else {
        this.setState({ time: this.state.time - 100 });
      }
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval)
}


  render() {
    const { time } = this.state;
    return (
      <div>{showTimer(time)}</div>
    );
  }
}

export default Timer;
