import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { expired } = this.props;
    if (!expired) {
      this.interval = setInterval(() => {
        if (this.state.time >= Date.now() && !expired) {
          this.setState({ time: this.state.time - 100 });
        } else {
          this.props.handelChangeTaskOnExpired();
          clearInterval(this.interval);
        }
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  render() {
    const { time } = this.state;
    return (
      <div>{showTimer(time)}</div>
    );
  }
}

Timer.propTypes = {
  expired: PropTypes.bool.isRequired,
  handelChangeTaskOnExpired: PropTypes.func.isRequired,
  date: PropTypes.number.isRequired,
};


export default Timer;
