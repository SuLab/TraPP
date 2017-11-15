import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export default class NodeBlock extends React.Component {
  static propTypes = {
    expanded: PropTypes.bool,
    pos: PropTypes.object,
    connect: PropTypes.object,
    id: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      width: 80,
      height: 300,
      connect: this.props.connect ? this.props.connect : null,
      pos: this.props.pos ? this.props.pos : { x: 0, y: 0 },
      expanded: this.props.expanded ? this.props.expanded : false,
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  renderRect = () => {
    const { width, height, index, value } = this.state;
    return (
      <g key={index} transform={'translate(60, 50)'}>
        <rect
          width={width}
          height={height}
          x={'10'}
          y={'0'}
          stroke="black"
          fill="white"
        />
        <text y="150" x="20">
          NodeBlock
        </text>
      </g>
    );
  };

  renderScrollButton() {
    return (
      <foreignObject x="40" y={this.getRectGroupHeight() + 35}>
        <form className="scroll-group">
          <i
            className="fa fa-chevron-up up-button"
            onClick={this.onClickUp}
            aria-hidden="true"
          />
          <i
            className="fa fa-chevron-down down-button"
            onClick={this.onClickDown}
            aria-hidden="true"
          />
        </form>
      </foreignObject>
    );
  }

  render() {
    const { expanded, pos } = this.state;
    return (
      <g
        id={this.props.id}
        transform={'translate(' + pos.x + ', ' + pos.y + ')'}
      >
        {this.renderRect()}
      </g>
    );
  }
}
