import React, { Component } from "react";
import {Dropdown, Label} from 'semantic-ui-react';
import { getTagColor } from "../../util/tags.util"

export class FilterByTags extends Component {

	constructor(props){
    super(props);
		this.state = {
			tags: props.tags
		};
	}

  onTagsFilterChanged = (e, data) => {
    this.setState({
      filterByTags: data.value
    })
    this.props.onChange(data.value);
  }

  dropdownOptions = () => this.state.tags.map(tag => {
    let color = getTagColor(tag);
    return ({
      'key': tag, 
      'value': tag, 
      'text': tag, 
      'content': <Label color={color}> {tag} </Label>
    });
  });

  renderLabel = (label) => {
    let color = getTagColor(label.text);
    return {
      color: color(),
      content: `${label.text}`,
    }
  }

	render(){
   return(<Dropdown 
      renderLabel = {this.renderLabel}
      onChange={this.onTagsFilterChanged}
      floated="right" 
      size="tiny" 
      placeholder='Filter by tags' 
      multiple 
      search 
      selection 
      options={this.dropdownOptions()} 
      noResultsMessage="No more tags found"/>);
	}
}