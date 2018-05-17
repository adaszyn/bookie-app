import React, { Component } from "react";
import { Grid, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import { chunk } from "lodash";

export class Carousel extends Component {
  constructor(props) {
    super(props);
    const chunks = chunk(props.items, 3);
    this.state = {
      chunks: chunks.length === 0 ? [[]] : chunks,
      selectedChunkIndex: 0
    };
  }
  componentWillReceiveProps = ({ items, perPage }) => {
    const chunks = chunk(items, 3);

    if (items !== this.props.items) {
      this.setState({
        chunks: chunks.length === 0 ? [[]] : chunks,
      });
    }
  };
  onNext = () => {
    if (this.state.selectedChunkIndex < this.state.chunks.length - 1) {
      this.setState({
        selectedChunkIndex: this.state.selectedChunkIndex + 1
      });
    }
  };
  onPrevious = () => {
    if (this.state.selectedChunkIndex > 0) {
      this.setState({
        selectedChunkIndex: this.state.selectedChunkIndex - 1
      });
    }
  };
  render() {
    const { renderItem, style, itemKey } = this.props;
    const { Column, Row } = Grid;
    const canClickNext =
      this.state.selectedChunkIndex !== this.state.chunks.length - 1;
    const canClickPrev = this.state.selectedChunkIndex !== 0;
    return (
      <Grid style={style} stackable>
        <Row columns={16}>
          <Column verticalAlign="middle" width={1} only="computer tablet">
            <Icon
              circular
              inverted
              color="teal"
              style={{ visibility: canClickPrev ? "visible" : "hidden" }}
              onClick={this.onPrevious}
              name="arrow left"
              link
            />
          </Column>
          <Column verticalAlign="middle" style={{ height: "100%" }} width={14}>
            <Grid style={{ height: "100%" }} stackable>
              <Row columns={15} style={{ height: "100%" }}>
                {this.state.chunks[this.state.selectedChunkIndex].map(item => (
                  <Grid.Column width={5} key={item[itemKey]}>
                    {renderItem(item)}
                  </Grid.Column>
                ))}
              </Row>
            </Grid>
          </Column>
          <Column verticalAlign="middle" width={1} only="computer tablet">
            <Icon
              circular
              inverted
              color="teal"
              onClick={this.onNext}
              style={{ visibility: canClickNext ? "visible" : "hidden" }}
              name="arrow right"
              link
            />
          </Column>
        </Row>
        <Grid stackable={false}>
            <Row only="mobile" columns={2}>
                <Column width={1}>
                    <Icon
                        style={{ visibility: canClickPrev ? "visible" : "hidden" }}
                        onClick={this.onPrevious}
                        name="arrow left"
                        link
                    />
                </Column>
                <Column width={1}>
                    <Icon
                        style={{ visibility: canClickNext ? "visible" : "hidden" }}
                        onClick={this.onNext}
                        name="arrow right"
                        link
                    />
                </Column>
            </Row>
        </Grid>

      </Grid>
    );
  }
}

Carousel.propTypes = {
  renderItem: PropTypes.func.isRequired,
  itemKey: PropTypes.string.isRequired,
  perPage: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired
};
