import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export default class EdgeGroup extends React.Component {
  static propTypes = {
    expanded: PropTypes.bool,
    edges: PropTypes.number,
    nodes: PropTypes.array,
    rectGroupHeight: PropTypes.number,
    onToggleExpand: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      edges: this.props.edges ? this.props.edges : 0,
      nodes: this.props.nodes ? this.props.nodes : [],
      rectGroupHeight: this.props.rectGroupHeight
        ? this.props.rectGroupHeight
        : 0,
      expanded: this.props.expanded ? this.props.expanded : false,
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (this.state.expanded !== nextProps.expanded) {
      this.setState({
        expanded: nextProps.expanded,
      });
    }
    if (this.state.nodes !== nextProps.nodes) {
      this.setState({
        nodes: nextProps.nodes,
      });
    }
    if (this.state.rectGroupHeight !== nextProps.rectGroupHeight) {
      this.setState({
        rectGroupHeight: nextProps.rectGroupHeight,
      });
    }
    if (nextProps.pos && this.state.pos) {
      this.setState({
        pos: nextProps.pos,
      });
    }
  }

  onClickPlus = () => {
    this.setState({
      expanded: true,
    });
    if (this.props.onToggleExpand) {
      this.props.onToggleExpand(true);
    }
  };

  onClickCompress = () => {
    this.setState({
      expanded: false,
    });
    if (this.props.onToggleExpand) {
      this.props.onToggleExpand(false);
    }
  };

  onClickUp = () => {
    if (this.state.offset > 0) {
      this.setState({
        offset: this.state.offset - 1,
      });
    }
  };

  onClickDown = () => {
    if (this.state.offset < this.state.rects.length - this.state.limit) {
      this.setState({
        offset: this.state.offset + 1,
      });
    }
  };

  getRectGroupHeight = () => {
    return this.state.rectGroupHeight;
  };

  renderLinks = () => {
    return (
      <g>
        <line
          x1="-150"
          y1={this.getRectGroupHeight() / 2 + 30}
          x2="0"
          y2={this.getRectGroupHeight() / 2 + 30}
          stroke-width="2"
          stroke="black"
        />
        <rect
          x="-120"
          y={this.getRectGroupHeight() / 2 + 20}
          rx="3"
          ry="3"
          width="90"
          height="20"
          fill="#efefef"
          opacity="0.75"
          stroke="black"
          stroke-width="0.5"
        />
        <text y={this.getRectGroupHeight() / 2 + 33} x="-100">
          {this.state.edges} edges
        </text>
      </g>
    );
  };

  renderLinksGroup = () => {
    return this.state.nodes.map((value, index) => {
      const y = index * 30 + 35;
      return (
        <line
          x1="-150"
          y1={this.getRectGroupHeight() / 2 + 30}
          x2="0"
          y2={y + 15}
          stroke-width="2"
          stroke="black"
        />
      );
    });
  };

  render() {
    const { expanded } = this.state;
    return (
      <g>
        {!expanded && this.renderLinks()}
        {expanded && this.renderLinksGroup()}
      </g>
    );
  }
}
