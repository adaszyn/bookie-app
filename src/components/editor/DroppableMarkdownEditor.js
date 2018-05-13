import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import {MarkdownEditor} from "./MarkdownEditor";

const boxTarget = {
  drop(props, monitor) {
    if (props.onDrop) {
      props.onDrop(props, monitor)
    }
  },
}

@DropTarget(props => props.accepts, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))

export class DroppableMarkdownEditor extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDrop: PropTypes.func,
  }

  getContainerStyle () {
    const { isOver } = this.props;
    return {
      transition: "0.2s linear border-color",
      border: "2px solid",
      borderColor: isOver ? "#636363" : "transparent"
    }
  }
  render() {
    const { connectDropTarget } = this.props
    return connectDropTarget(
      <div style={this.getContainerStyle()}>
        <MarkdownEditor
          onChange={this.props.onChange}
          value={this.props.value}
          placeholder = "Drag and drop images onto this editor to add them to your note" />
      </div>
    )
  }
}
