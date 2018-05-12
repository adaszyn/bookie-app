import React, { Component } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import RTE from './RTE'
import RichTextEditor from "react-rte";
import { API_BASE, uploadImage } from "../../services/api-service"

export class RTEContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: props.note ? props.note : RichTextEditor.createEmptyValue()
		}
		this.handleFileDrop = this.handleFileDrop.bind(this)
	}

	imageUploadSuccess = url => {
		let updatedNote = this.state.value.toString("markdown") + `![](${API_BASE}${url})`;
		this.setState({
			'value': RichTextEditor.createValueFromString(updatedNote, "markdown")
		})
		if(this.props.onChange)
			this.props.onChange(this.state.value);
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
				uploadImage(file)
				.then(response => {this.imageUploadSuccess(response.data.url)})
				.catch(err => console.log(err))
			} else {

			}
		}
	}

	render() {
		const { FILE } = NativeTypes

		return (
				<RTE 
					value = {this.state.value}
					onChange = {this.onChange}
					accepts={[FILE]} 
					onDrop={this.handleFileDrop} />
		)
	}
}