import React, { Component } from "react";
import { Grid, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import { chunk } from "lodash";

export class Carousel extends Component {
  state = {
    chunks: chunk(this.props.items, 3),
    selectedChunkIndex: 0
  };
  componentWillReceiveProps = ({ items, perPage }) => {
    if (items !== this.props.items) {
      this.setState({
        chunks: chunk(items, perPage)
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
      console.log(this.props.items)
    const { renderItem, style, itemKey } = this.props;
    const { Column, Row } = Grid;
    const canClickNext =
      this.state.selectedChunkIndex !== this.state.chunks.length - 1;
    const canClickPrev = this.state.selectedChunkIndex !== 0;
    return (
      <Grid style={style}>
        <Row columns={16}>
          <Column verticalAlign="middle" width={1}>
            <Icon
              style={{ visibility: canClickPrev ? "visible" : "hidden" }}
              onClick={this.onPrevious}
              name="arrow left"
            />
          </Column>
          <Column verticalAlign="middle" style={{ height: "100%" }} width={14}>
            <Grid style={{ height: "100%" }}>
              <Row columns={15} style={{ height: "100%" }}>
                {this.state.chunks[this.state.selectedChunkIndex].map(item => (
                  <Grid.Column width={5} key={item[itemKey]}>
                    {renderItem(item)}
                  </Grid.Column>
                ))}
              </Row>
            </Grid>
          </Column>
          <Column verticalAlign="middle" width={1}>
            <Icon
              onClick={this.onNext}
              style={{ visibility: canClickNext ? "visible" : "hidden" }}
              name="arrow right"
            />
          </Column>
        </Row>
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
