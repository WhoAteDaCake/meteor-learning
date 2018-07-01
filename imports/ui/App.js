import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";

import { Tasks } from "../api/tasks.js";

import { Task } from "./Task.js";

// App component - represents the whole app
class AppBare extends Component {
  state = {
    taskText: ""
  };

  renderTasks() {
    return this.props.tasks.map(task => <Task key={task._id} task={task} />);
  }

  handleSubmit = e => {
    e.preventDefault();
    const { taskText } = this.state;
    Tasks.insert({ text: taskText, createdAt: new Date() }); // current time
    this.setState({ taskText: "" });
  };

  updateTaskText = e => this.setState({ taskText: e.target.value });

  render() {
    const { taskText } = this.state;
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
          <form className="new-task" onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={taskText}
              onChange={this.updateTaskText}
              placeholder="Type to add new tasks"
            />
          </form>
        </header>
        <ul>{this.renderTasks()}</ul>
      </div>
    );
  }
}

export const App = withTracker(() => ({
  tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch()
}))(AppBare);
