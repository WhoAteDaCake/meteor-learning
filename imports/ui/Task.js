import React, { Component } from "react";

// Task component - represents a single todo item
export class Task extends Component {
  render() {
    return <li>{this.props.task.text}</li>;
  }
}
