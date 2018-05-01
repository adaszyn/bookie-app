import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import {DraggableTag} from "./DraggableTag";
import {getTagColor} from "../../util/tags.util";

@observer
export class DraggableTags extends Component {
  render() {
    return (
      <div style={{display: "flex"}}>
        {this.props.allTags.map(tag => <DraggableTag color={getTagColor(tag)} key={tag} header={tag} name={tag}/>)}
      </div>
    );
  }
}
export const DraggableTagsContainer = inject(stores => {
  return {
    allTags: stores.notesStore.allTags,
  };
})(DraggableTags);