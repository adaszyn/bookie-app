import React, { Component } from "react";
import { observer } from "mobx-react";
import { DropTarget } from "react-dnd";

const boxTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    props.onTagDropped(item);
    return props.note;
  }
};

@observer
@DropTarget("TAGS", boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
export class TagsDropZone extends Component {
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    const transform = `scale(${isActive ? "1.1, 1.1" : "1.0, 1.0"})`;

    return connectDropTarget(
      <div style={{ transform, transition: "0.1s linear transform" }}>
        {this.props.children}
      </div>
    );
  }
}
