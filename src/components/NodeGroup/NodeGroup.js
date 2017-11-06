import React from 'react';
import * as d3 from 'd3';

export default class NodeGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 120,
      height: 40,
      margin: 5,
      rects: this.props.nodes ? this.props.nodes : [],
      expanded: false
    };
  }

  componentDidMount() {
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

  renderRect = () => {
    const { width, height, margin, rects} = this.state;
    return rects.map((value, index) => {
      const y = index * (height + margin) + 35;
      return (
        <g
          transform = { 'translate(0, ' + y + ')'}
        >
          <rect
            key={index}
            width={width}
            height={height}
            x={'10'}
            y={'0'}
            stroke="black"
            fill="white"
          />
          <text
            y="25"
            x="30"
          >
            {value}
          </text>
        </g>
      );
    });
  };

  renderRectGroup = () => {
    const { height, margin, rects} = this.state;
    return (
      <g className="rect-group">
        <rect
          width="140"
          height={rects.length * ( height + margin ) + 40}
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
      </g>
    );
  }

  renderGroup = () => {
    const { rects} = this.state;
    return (
      <g>
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

  render() {
    const { expanded } = this.state;
    return (
      <g>
        { expanded &&
          this.renderRectGroup()
        }
        { !expanded &&
          this.renderGroup()
        }
      </g>);
  }
}
