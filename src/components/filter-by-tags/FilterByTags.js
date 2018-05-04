import React, { Component } from "react";
import {Dropdown, Label} from 'semantic-ui-react';
import {generateHash} from "../../util/string.util";
import {COLORS} from "../../const/colors-const";

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
    let color = COLORS[generateHash(tag) % COLORS.length];
    return ({
      'key': tag, 
      'value': tag, 
      'text': tag, 
      'content': <Label color={color}> {tag} </Label>
    });
  });

  renderLabel = (label) => {
    let color = () => {return COLORS[generateHash(label.text) % COLORS.length]};
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