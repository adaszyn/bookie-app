import React, { Component } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { Progress } from "semantic-ui-react"
import { API_BASE, uploadImage } from "../../services/api-service"
import {DroppableMarkdownEditor} from "./DroppableMarkdownEditor";

const { FILE } = NativeTypes

export class RTEContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
      uploadInProgress: false,
		}
		this.handleFileDrop = this.handleFileDrop.bind(this)
	}


	imageUploadSuccess = url => {
		this.props.onImageUpload(`${API_BASE}${url}`);
		this.setState({
      uploadInProgress: false,
		})
	}

	imageUploadFail = () => {
		this.setState({
      uploadInProgress: false
		})
	}

	onChange = value => {
		this.setState({
			value: value
		});
	}

	handleFileDrop(item, monitor) {
		if (monitor) {
			const validTypes = ["image/jpeg", "image/png"];
			const droppedFiles = monitor.getItem().files;
			let file = droppedFiles[0];

			if(file && validTypes.indexOf(file.type) > -1) {
				this.setState({
					uploadInProgress: true
				})
				uploadImage(file)
				.then(response => {this.imageUploadSuccess(response.data.url)})
				.catch(this.imageUploadFail);
			}
		}
	}

	render() {
		return (
				<div>
					<DroppableMarkdownEditor
						value={this.props.value}
						onChange = {this.props.onChange}
						accepts={[FILE]} 
						onDrop={this.handleFileDrop} />
					{this.state.uploadInProgress ? <Progress size="tiny" active percent="100" color="teal"/> : null}
				</div>
		)
	}
}