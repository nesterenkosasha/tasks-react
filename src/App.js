import React, { Component } from 'react';
import Task from './Task';
import ModalWindow from './Modal-window';
import { getTasks, deleteTasks } from './api';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      modalWindow: false,
      // alarms: []
    };
    this.handelToggleModelWindow = this.handelToggleModelWindow.bind(this);
    this.handelDeleteTaskClick = this.handelDeleteTaskClick.bind(this);
    this.handleAddNewTask = this.handleAddNewTask.bind(this);
  }
  async componentDidMount() {
    try {
      await getTasks()
        .then((data) => {
          if (data.status === 200) {
            return data.json();
          }
          return data;
        })
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
    return (
      <div className="App">
        <header className="App-header">
          <h1>App</h1>
        </header>
        <div className="Wrapper-tasks">
          {
            tasks.map((task) => {
              return (<Task
                key={task.id}
                {...task}
                handelDeleteTaskClick={this.handelDeleteTaskClick}
              />);
            })
          }
        </div>
        <button className="Add-button" onClick={() => this.handelToggleModelWindow()} >+</button>
        {
          modalWindow
            ? <ModalWindow handleAddNewTask={this.handleAddNewTask} handelToggleModelWindow={this.handelToggleModelWindow} />
            : null
        }
      </div>
    );
  }
}

export default App;
