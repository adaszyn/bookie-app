import React, { Component } from "react";
import RichTextEditor from "react-rte";

const FORMAT = "markdown";

export class MarkdownEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: props.value
        ? RichTextEditor.createValueFromString(props.value, "markdown")
        : RichTextEditor.createEmptyValue()
    };
  }
  componentWillReceiveProps(props) {
    if (this.state.editorContent.toString(FORMAT) !== props.value) {
      this.setState({
        editorContent: RichTextEditor.createValueFromString(props.value, FORMAT)
      });
    }
  }
  onChange = value => {
    this.setState(
      {
        editorContent: value
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(value.toString(FORMAT));
        }
      }
    );
  };

  render() {
    return (
      <RichTextEditor
        onChange={this.onChange}
        value={this.state.editorContent}
        placeholder={this.props.placeholder}
      />
    );
  }
}
