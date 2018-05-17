import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { DraggableTag } from "./DraggableTag";
import { getTagColor } from "../../util/tags.util";
import { Icon, Popup, Divider } from "semantic-ui-react";

@observer
export class DraggableTags extends Component {
  onDragStateChange = isDragging => {
    if (this.props.onDragStateChange) {
      this.props.onDragStateChange(isDragging);
    }
  };

  render() {
    return (
      <div>
        <div
          style={{
            cursor: "pointer",
            animation: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
            animationDelay: "2s",
            textAlign: "right"
          }}
        >
          <Popup
            trigger={
              <span>
                {" "}
                <Icon name="tags" color="grey" size="small" /> Tags{" "}
                <Icon name="question" color="grey" size="small" />{" "}
              </span>
            }
            content="You can simply drag these tags onto your notes!"
            position="top right"
          />
        </div>
        <Divider fitted />
        <div style={{ display: "flex", flexWrap: "wrap", padding: "2px 10px" }}>
          {this.props.allTags.map(tag => (
            <DraggableTag
              onDragStateChange={this.onDragStateChange}
              color={getTagColor(tag)}
              key={tag}
              header={tag}
              name={tag}
            />
          ))}
          <div style={{ flexGrow: 1 }} />
        </div>
      </div>
    );
  }
}
export const DraggableTagsContainer = inject(stores => {
  return {
    allTags: stores.notesStore.allTags
  };
})(DraggableTags);
