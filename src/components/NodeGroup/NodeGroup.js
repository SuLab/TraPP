import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export default class NodeGroup extends React.Component {
  static propTypes = {
    nodes: PropTypes.array,
    expanded: PropTypes.bool,
    pos: PropTypes.object,
    connect: PropTypes.object,
    id: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      width: 120,
      height: 25,
      connect: this.props.connect ? this.props.connect : null,
      pos: this.props.pos ? this.props.pos : {x:0, y:0},
      margin: 5,
      offset: 0,
      limit: 10,
      rects: this.props.nodes ? this.props.nodes : [],
      expanded: this.props.expanded ? this.props.expanded : false,
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded && this.state.expanded !== nextProps.expanded) {
      this.setState({
        expanded: nextProps.expanded
      });
    }
    if (nextProps.pos && this.state.pos ) {
      this.setState({
        pos: nextProps.pos
      });
    }
  }

  onClickPlus = () => {
    this.setState({
      expanded: true
    });
  }

  onClickCompress = () => {
    this.setState({
      expanded: false
    })
  }

  onClickUp = () => {
    console.log('Up');
    if (this.state.offset > 0) {
      this.setState({
        offset: this.state.offset - 1
      });
    }
  }

  onClickDown = () => {
    if (this.state.offset < (this.state.rects.length - this.state.limit)) {
      this.setState({
        offset: this.state.offset + 1
      });
    }
  }

  getRectGroupHeight = () => {
    const { height, margin, rects, limit } = this.state;
    if (rects.length > limit) {
      return limit * ( height + margin )
    } else {
      return rects.length * ( height + margin );
    }
  }

  renderLinks = () => {
    const startPos = this.state.connect;
    const curPos = this.state.pos;
    if (startPos) {
      return (
        <line
          x1 = {startPos.pos.x}
          y1 = {startPos.pos.y}
          x2 = {curPos.x}
          y2 = {curPos.y}
        />
      );
    }
  }

  renderRect = () => {
    const { width, height, margin, rects, offset, limit} = this.state;
    return rects.slice(offset, offset + limit).map((value, index) => {
      const y = index * (height + margin) + 35;
      return (
        <g
          key={index}
          transform = { 'translate(0, ' + y + ')'}
        >
          <rect
            width={width}
            height={height}
            x={'10'}
            y={'0'}
            stroke="black"
            fill="white"
          />
          <text
            y="17"
            x="30"
          >
            {value}
          </text>
        </g>
      );
    });
  };

  renderRectGroup = () => {
    const { height, margin, rects, limit} = this.state;
    return (
      <g className="rect-group">
        <rect
          width="140"
          height={this.getRectGroupHeight() + 60}
          strokeDasharray="5,2"
          strokeLinecap="butt"
          stroke="black"
          fill="white"
        />
        <text
          y="25"
          x="10"
        >
          total: {rects.length} nodes
        </text>
        <foreignObject
          x="125"
          y="5"
        >
          <form>
            <i className="fa fa-compress compress-button" onClick={this.onClickCompress} aria-hidden="true"></i>
          </form>
        </foreignObject>
        {this.renderRect()}
        {
          rects.length > limit &&
          this.renderScrollButton()
        }
      </g>
    );
  }

  renderGroup = () => {
    const { rects} = this.state;
    return (
      <g
        transform = { 'translate(0, 0)'}
      >
        <rect
          width="150"
          height="60"
          x="0"
          stroke="black"
          fill="white"
        >
        </rect>
        <text
          className="node-label"
          y="35"
          x="30"
          fill="black"
        >{rects.length} Nodes</text>
        <g className="plus-button" onClick={this.onClickPlus}>
          <rect
            width="20"
            height="20"
            x="0"
            stroke="black"
            fill="white"
          >
          </rect>
          <text
            className="plus-sign"
            y="15"
            x="5"
            fill="black"
          >+</text>
        </g>
      </g>
    )
  }

  renderScrollButton() {
    return (
      <foreignObject
        x="40"
        y={this.getRectGroupHeight() + 35}
      >
        <form className="scroll-group">
          <i className="fa fa-chevron-up up-button" onClick={this.onClickUp} aria-hidden="true"></i>
          <i className="fa fa-chevron-down down-button" onClick={this.onClickDown} aria-hidden="true"></i>
        </form>
      </foreignObject>
    );
  }

  render() {
    const { expanded, pos } = this.state;
    return (
      <g
        id={ this.props.id }
        transform = { 'translate(' + pos.x + ', ' + pos.y + ')'}
      >
        { expanded &&
          this.renderRectGroup()
        }
        { !expanded &&
          this.renderGroup()
        }
        
      </g>);
  }
}
