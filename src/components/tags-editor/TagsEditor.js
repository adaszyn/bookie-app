import React, { Component } from "react";
import {Label, Input, Icon, Divider} from 'semantic-ui-react';

export class TagsEditor extends Component {
	
	render(){
		const tags = this.props.tags.split(',');
		return (
			<div>
				{tags.map(tag => <Label style={{"margin-bottom": "5px"}}> <Icon name="delete" /> {tag} </Label>)}
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