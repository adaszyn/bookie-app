import React, { Component } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import RTE from './RTE'
import RichTextEditor from "react-rte";
import { Progress } from "semantic-ui-react"
import { API_BASE, uploadImage } from "../../services/api-service"

export class RTEContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: props.value ? props.value : RichTextEditor.createEmptyValue()
		}
		this.handleFileDrop = this.handleFileDrop.bind(this)
	}

	componentWillReceiveProps(props){
		if(!this.state.value._cache.markdown){
			this.setState({
				value: props.value
			})
		}
	}

	imageUploadSuccess = url => {
		let updatedNote = this.state.value.toString("markdown") + `![](${API_BASE}${url})`;
		this.setState({
			'uploadInProgress': false,
			'value': RichTextEditor.createValueFromString(updatedNote, "markdown")
		})
		if(this.props.onChange)
			this.props.onChange(this.state.value);
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
		if(this.props.onChange)
			this.props.onChange(this.state.value);
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
				.catch(err => this.imageUploadFail());
			} else {

			}
		}
	}

	render() {
		const { FILE } = NativeTypes

		return (
				<div>
					<RTE 
						value = {this.state.value}
						onChange = {this.onChange}
						accepts={[FILE]} 
						onDrop={this.handleFileDrop} />
					{this.state.uploadInProgress ? <Progress size="tiny" active percent="100" color="teal"/> : null}
				</div>
		)
	}
}