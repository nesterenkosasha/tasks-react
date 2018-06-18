import React, { Component } from 'react';
import Task from './Task';
import ModalWindow from './Modal-window';
import AlarmWindow from './Alarm-window';
import { getTasks, deleteTasks } from './api';
import { selectByProperty } from './utils';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      modalWindow: false,
    };
    this.handelToggleModelWindow = this.handelToggleModelWindow.bind(this);
    this.handelDeleteTaskClick = this.handelDeleteTaskClick.bind(this);
    this.handleAddNewTask = this.handleAddNewTask.bind(this);
    this.handelChangeTaskOnExpired = this.handelChangeTaskOnExpired.bind(this);
  }

  async componentDidMount() {
    try {
      await getTasks()
        .then((res) => {
          this.setState({ tasks: res });
        });
    } catch (err) {
      console.log(err);
    }
  }

  async handelDeleteTaskClick(id) {
    try {
      await deleteTasks(id);
      const { tasks } = this.state;
      const updatedState = tasks.filter((task) => task.id !== id);
      this.setState({ tasks: updatedState });
    } catch (err) {
      console.log(err);
    }
  }

  handelChangeTaskOnExpired(id) {
    const { tasks } = this.state;
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, expired: true };
      }
      return task;
    });
    this.setState({ tasks: updatedTasks });
  }

  handelToggleModelWindow(value) {
    if (value === 'undefined') {
      this.setState({ modalWindow: value });
    } else {
      this.setState({ modalWindow: !this.state.modalWindow });
    }
  }

  handleAddNewTask(task) {
    this.setState({ tasks: this.state.tasks.concat(task) });
  }

  render() {
    const { modalWindow, tasks } = this.state;
    const expiredTasks = selectByProperty(tasks, 'expired', true);
    return (
      <div className="App">
        <header className="App-header">
          <h1>App</h1>
        </header>
        <div className="Wrapper-tasks">
          {
            tasks.map((task) => (
              <Task
                key={task.id}
                {...task}
                handelChangeTaskOnExpired={this.handelChangeTaskOnExpired}
                handelDeleteTaskClick={this.handelDeleteTaskClick}
              />
            ))
          }
        </div>
        <button className="Add-button" onClick={() => this.handelToggleModelWindow()} >+</button>
        {
          modalWindow
            ? (<ModalWindow
              handleAddNewTask={this.handleAddNewTask}
              handelToggleModelWindow={this.handelToggleModelWindow}
            />)
            : null
        }
        {
          expiredTasks.length
            ? (<AlarmWindow
              expiredTasks={expiredTasks}
              handelDeleteTaskClick={this.handelDeleteTaskClick}
            />)
            : null
        }
      </div>
    );
  }
}

export default App;
