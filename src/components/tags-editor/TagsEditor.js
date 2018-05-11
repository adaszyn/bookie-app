import React, { Component } from "react";
import {Header, Label, Icon, Divider, Form} from 'semantic-ui-react';
import { getTagColor } from "../../util/tags.util"

export class TagsEditor extends Component {

	constructor(props){
		super(props);
		this.state = {
			tags: props.tags,
			textInput: ''
		};
	}

	updateTagsArrayInState = updatedArray => {
		this.setState({
			tags: updatedArray
		})
	}

	updateTextInputInState = textInput => {
		this.setState({
			textInput: textInput
		})
	}

	onTagRemoved = tag => {
		const updatedArray = this.state.tags.slice();
		if(updatedArray.indexOf(tag > -1)){
			updatedArray.splice(updatedArray.indexOf(tag), 1);
			this.updateTagsArrayInState(updatedArray);
		}
		this.props.onTagRemoved(updatedArray);
	}

	onTagAdded = () => {
		if(this.state.tags.indexOf(this.state.textInput) > -1){
			return;
		}
		const updatedArray = Array.from(new Set([this.state.textInput, ...this.state.tags]));
		this.props.onTagAdded(updatedArray);
		this.setState({
			tags: updatedArray,
			textInput: ''
		});
	}
	
	onInputChange = e => {
	    if(e.target.value && !/^[a-zA-Z0-9]+$/.test(e.target.value)) {
	      this.setState({ formError: "Woops! Alphabets and numbers only" });
	    } else {
	      this.setState({ formError: "" });
	    }
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
						<Label key={idx} style={tagStyle} color={getTagColor(tag)}> 
							<Icon 
								link
								name="remove" 
								onClick={() => this.onTagRemoved(tag)}/>  
							{tag} 
						</Label>)
				})}
				<Divider/>
				<Form size="small" onSubmit={() => this.onTagAdded(this.state.tags)}>
	        <Form.Group>
           	<Form.Input
           	placeholder = "tag name"
				    value = {textInput}
				    onChange = {this.onInputChange.bind(this)}/>
	          <Form.Button disabled={this.state.textInput === '' || this.state.formError !== ''} content='Add' />
	        </Form.Group>
    		</Form>
			{this.state.formError}
			</div>
		);
	}
} 