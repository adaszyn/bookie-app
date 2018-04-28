import React, { Component } from "react";
import {Header, Label, Input, Icon, Divider} from 'semantic-ui-react';

export class TagsEditor extends Component {

	constructor(props){
		super(props);

		this.state = {
			tags: props.tags,
			textInput: ''
		};
	}

	updateTagsArrayInState = updatedArray => {
		const updatedState = Object.assign({}, this.state);
		updatedState.tags = updatedArray;
		this.setState(updatedState);
	}

	updateTextInputInState = textInput => {
		const updatedState = Object.assign({}, this.state);
		updatedState.textInput = textInput;
		this.setState(updatedState);
	}

	onTagRemoved = tag => {
		const updatedArray = this.state.tags.slice();
		if(updatedArray.indexOf(tag > -1)){
			updatedArray.splice(updatedArray.indexOf(tag), 1);
			this.updateTagsArrayInState(updatedArray);
		}
		this.props.onTagRemoved(tag, updatedArray);
	}

	onTagAdded = () => {
		const updatedArray = this.state.tags.slice();
		updatedArray.push(this.state.textInput);
		this.props.onTagAdded(this.state.textInput, updatedArray);
		this.setState({
			tags: updatedArray,
			textInput: ''
		});
	}
	
	onInputChange = e => {
		this.updateTextInputInState(e.target.value);
	}

	render(){
		const tags = this.state.tags;
		const tagStyle = {
			marginBottom: "5px"
		};
		const textInput = this.state.textInput;

		return (
			<div>
				<Header> Tags </Header>
				{tags.map((tag, idx) => {
					return (
						<Label key={idx} style={tagStyle}> 
							<Icon 
								link
								name="remove" 
								onClick={() => this.onTagRemoved(tag)}/>  
							{tag} 
						</Label>)
				})}
				<Divider/>
				 <Input
				 	size = "mini"
				 	focus
			    action = {{ content: 'Add', onClick: this.onTagAdded}}
			    iconPosition="left"
			    labelPosition="right" 
			    value = {textInput}
			    onChange = {this.onInputChange.bind(this)}/>
			</div>
		);
	}
} 