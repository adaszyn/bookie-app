import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import {TagBubble} from "./TagBubble";

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
    }
  },
}

@DragSource("TAGS", boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export class DraggableTag extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  render() {
    const { isDragging, connectDragSource } = this.props
    const { name } = this.props
    const opacity = isDragging ? 0.4 : 1
    const transform = `scale(${isDragging ? "1.1, 1.1" : "1.0, 1.0"})`


    return connectDragSource(<div><TagBubble tag={name} style={{ opacity, transform }} /></div>);
  }
}