import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import {DraggableTag} from "./DraggableTag";
import {getTagColor} from "../../util/tags.util";
import {Icon, Popup} from "semantic-ui-react";

@observer
export class DraggableTags extends Component {
  render() {
    return (
      <div style={{display: "flex"}}>
        {this.props.allTags.map(tag => <DraggableTag color={getTagColor(tag)} key={tag} header={tag} name={tag}/>)}
        <div style={{flexGrow: 1}}/>
        <div style={{cursor: "pointer", animation: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both", animationDelay: "2s"}}>
          <Popup
            trigger={<Icon name='question' color='grey' size='small' />}
            content='You can simply drag tag on your notes!'
            position='top right'
          />
        </div>
      </div>
    );
  }
}
export const DraggableTagsContainer = inject(stores => {
  return {
    allTags: stores.notesStore.allTags,
  };
})(DraggableTags);