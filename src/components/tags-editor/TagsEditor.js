import React, { Component } from "react";
import {Label, Input, Icon, Divider} from 'semantic-ui-react';

export class TagsEditor extends Component {

	constructor(props){
		super(props);
		var count = 0;
		this.state = {
			tags: props.tags
		};
	}
	
	render(){
		const tags = this.state.tags;
		return (
			<div>
				{tags.map(tag => <Label key={tag.key} style={{"marginBottom": "5px"}}> <Icon name="delete" /> {tag.tag} </Label>)}
				<Divider/>
				 <Input
				 	size = "mini"
				    action = "Add"
				    iconPosition="left"
				    labelPosition="right"
				  />
			</div>
		);
	}
} 