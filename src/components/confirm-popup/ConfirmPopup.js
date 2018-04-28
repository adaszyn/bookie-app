import React, { Component } from "react";
import { Popup, Divider, Icon, Button } from 'semantic-ui-react';

export class ConfirmPopup extends Component {

 	state = {
    isOpen: false
  }

  setDeletePopupVisibility = visible => {
    this.setState({
      isOpen: visible
    });
  }

  onPopupConfirm = () => {
		if(typeof this.props.onConfirm !== 'undefined')
  		this.props.onConfirm();
    this.setDeletePopupVisibility(false);
  }

  onPopupCancel = () => {
  	if(typeof this.props.onCancel !== 'undefined')
  		this.props.onCancel();
    this.setDeletePopupVisibility(false);
  }
	
	render(){
		const position = this.props.position;
		const title = this.props.title ? (this.props.title) : "Are You Sure ?";
		const message = this.props.message ? (this.props.message) : null;

		return (
			<Popup
				on="click"
				trigger={<Icon onClick={(e) => {e.preventDefault()}} name='trash'/>} 
				open={this.state.isOpen}
				position='bottom right'
				onOpen={() => {this.setDeletePopupVisibility(true)}}
				onClose={() => {this.setDeletePopupVisibility(false)}}>
				<Popup.Header>
					{title}
				</Popup.Header>
				<Popup.Content>
					{message}
					<Divider />
					<Button onClick={this.onPopupCancel}> Cancel </Button> 
					<Button onClick={this.onPopupConfirm}> Delete </Button>
				</Popup.Content>
			</Popup>
		)
	}
}