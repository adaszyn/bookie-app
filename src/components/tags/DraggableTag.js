import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import {Label} from "semantic-ui-react";
import {generateHash} from "../../util/string.util";
import {COLORS} from "../../const/colors-const";

const style = {
  border: '1px dashed gray',
  cursor: 'move',
  marginLeft: "4px",
  marginRight: "4px",
}

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
  getTagColor = (tag) => COLORS[generateHash(tag) % COLORS.length];

  render() {
    const { isDragging, connectDragSource } = this.props
    const { name } = this.props
    const opacity = isDragging ? 0.4 : 1
    const transform = `scale(${isDragging ? "1.1, 1.1" : "1.0, 1.0"})`


    return connectDragSource(<div>
      <Label color={this.getTagColor(name)} style={{ ...style, opacity, transform }}>{name}</Label>
    </div>)
  }
}