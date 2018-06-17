import React, { Component } from 'react';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/fontawesome-free-solid';

class AlarmWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expiredTasks: this.props.expiredTasks,
      activeIndex: 0
    }
    this.handelBtnLeftRightClick = this.handelBtnLeftRightClick.bind(this);
  }

  handelBtnLeftRightClick(e) {
    let { activeIndex } = this.state;
    let { expiredTasks } = this.props;
    switch(e.target.dataset.side){
      case "left":{
          if(activeIndex === 0){
            this.setState({ activeIndex: expiredTasks.length-1 })
          } else {
            this.setState({ activeIndex: activeIndex-1 })
          }
          break
      }
      case "right":{
          if(activeIndex === expiredTasks.length-1){
            this.setState({ activeIndex: 0 })
          } else {
            this.setState({ activeIndex: activeIndex+1 })
          }
          break
      }
      default: {
        this.setState({ activeIndex: 0 })
      }
  }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.expiredTasks.length <= this.state.activeIndex){
      this.setState({ activeIndex: this.state.activeIndex-1 })
    }
  }

  render() {
    const { activeIndex } = this.state;
    const { expiredTasks, handelDeleteTaskClick } = this.props;
    return (
      <div className="Overlay">
        <div className="Alarm-border-all">
          <button data-side="left" onClick={this.handelBtnLeftRightClick} className="Angle Btn" >
          <FontAwesomeIcon data-side="left" onClick={this.handelBtnLeftRightClick} className="Angle" icon={faAngleLeft} size='2x' />
          </button>
          <div id="Alarms">
            <div className="Amount">
            <span>{expiredTasks[activeIndex].id}</span>/
            <span>{expiredTasks.length}</span>
            </div>
            <h1>!</h1>
            <h2>Time is over</h2>
            <h3>{expiredTasks[activeIndex].task}</h3>
            <button className="Button" onClick={() => handelDeleteTaskClick(expiredTasks[activeIndex].id)}>OK</button>
          </div>
          <button data-side="right" onClick={this.handelBtnLeftRightClick} className="Angle Btn" >
        <FontAwesomeIcon data-side="right" onClick={this.handelBtnLeftRightClick} className="Angle" icon={faAngleRight} size='2x' />
          </button>
        </div>
      </div>
    );
  }
}

export default AlarmWindow;

// <i className="fa fa-angle-right fa-3x Angle"></i> 
