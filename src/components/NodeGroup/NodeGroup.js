import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export default class NodeGroup extends React.Component {
  static propTypes = {
    nodes: PropTypes.array,
    expanded: PropTypes.bool,
    edgeExpanded: PropTypes.bool,
    edges: PropTypes.array,
    pos: PropTypes.object,
    id: PropTypes.string,
    onToggleExpand: PropTypes.func,
    onToggleEdgeExpand: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      width: 120,
      height: 25,
      overalHeight: 60,
      pos: this.props.pos ? this.props.pos : { x: 0, y: 0 },
      edges: this.props.edges ? this.props.edges : [],
      margin: 5,
      offset: 0,
      limit: 10,
      edgeOffset: 0,
      edgeLimit: 10,
      rects: this.props.nodes ? this.props.nodes : [],
      expanded: this.props.expanded ? this.props.expanded : false,
      edgeExpanded: this.props.edgeExpanded ? this.props.edgeExpanded : false,
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (this.state.expanded !== nextProps.expanded) {
      this.setState({
        expanded: nextProps.expanded,
      });
    }
    if (this.state.edgeExpanded !== nextProps.edgeExpanded) {
      let overalHeight = 60;
      if (nextProps.edgeExpanded) {
        overalHeight = this.getEdgeGroupHeight() + 20;
      }
      this.setState({
        edgeExpanded: nextProps.edgeExpanded,
        overalHeight: overalHeight,
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
      edgeExpanded: false,
    });
    if (this.props.onToggleExpand) {
      this.props.onToggleExpand(true);
    }
    if (this.props.onToggleEdgeExpand) {
      this.props.onToggleEdgeExpand(false);
    }
  };

  onClickCompress = () => {
    this.setState({
      expanded: false,
      edgeExpanded: false,
    });
    if (this.props.onToggleExpand) {
      this.props.onToggleExpand(false);
    }
    if (this.props.onToggleEdgeExpand) {
      this.props.onToggleEdgeExpand(false);
    }
  };

  onClickExpandEdge = () => {
    this.setState({
      edgeExpanded: true,
      expanded: false,
    });
    if (this.props.onToggleEdgeExpand) {
      this.props.onToggleEdgeExpand(true);
    }
    if (this.props.onToggleExpand) {
      this.props.onToggleExpand(false);
    }
  };

  onClickUp = () => {
    console.log('Up');
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

  onVerticalClickUp = () => {
    if (this.state.edgeOffset > 0) {
      this.setState({
        edgeOffset: this.state.edgeOffset - 1,
      });
    }
  };

  onVerticalClickDown = () => {
    if (
      this.state.edgeOffset <
      this.state.edges.length - this.state.edgeLimit
    ) {
      this.setState({
        edgeOffset: this.state.edgeOffset + 1,
      });
    }
  };

  getRectGroupHeight = () => {
    const { height, margin, rects, limit } = this.state;
    if (rects.length > limit) {
      return limit * (height + margin);
    } else {
      return rects.length * (height + margin);
    }
  };

  getEdgeGroupHeight = () => {
    const { height, margin, edges, edgeLimit } = this.state;
    if (edges.length > edgeLimit) {
      return edgeLimit * (height + margin);
    } else {
      return edges.length * (height + margin);
    }
  };

  getRectHeight = () => {
    if (this.state.expanded) {
      return this.getRectGroupHeight();
    } else {
      return this.state.overalHeight;
    }
  };

  renderLinks = () => {
    return (
      <g className="edges">
        <line
          x1="-150"
          y1={this.getRectGroupHeight() / 2 + 30}
          x2="0"
          y2={this.getRectGroupHeight() / 2 + 30}
          strokeWidth="2"
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
          stroke="#000"
          strokeWidth="0.5"
        />
        <text y={this.getRectGroupHeight() / 2 + 33} x="-100">
          {this.state.edges.length} edges
        </text>
        <foreignObject x="-35" y={this.getRectGroupHeight() / 2 + 15}>
          <form>
            <i
              className="fa fa-expand expand-button"
              onClick={this.onClickExpandEdge}
              aria-hidden="true"
            />
          </form>
        </foreignObject>
      </g>
    );
  };

  renderLinksGroup = () => {
    const { height, margin, rects, offset, limit } = this.state;
    return rects.slice(offset, offset + limit).map((value, index) => {
      const y = index * (height + margin) + 35;
      return (
        <line
          x1="-150"
          y1={this.getRectGroupHeight() / 2 + 30}
          x2="0"
          y2={y + 15}
          strokeWidth="2"
          stroke="black"
        />
      );
    });
  };

  renderEdgeGroup = () => {
    return (
      <g>
        {this.renderEdges()}
        {this.state.edges.length > 10 && this.renderVerticalScrollButton()}
      </g>
    );
  };

  renderEdges = () => {
    const { height, margin, edges, edgeOffset, edgeLimit, pos, overalHeight } = this.state;
    return edges
      .slice(edgeOffset, edgeOffset + edgeLimit)
      .map((value, index) => {
        const y = pos.y - overalHeight / 2 + index * (height + margin);
        return (
          <g key={index}>
            <line
              x1="-150"
              y1={this.getRectGroupHeight() / 2 + 30}
              x2="0"
              y2={y + 15}
              strokeWidth="1"
              stroke="black"
            />
            <rect
              x="-80"
              y={y + 5}
              rx="3"
              ry="3"
              width="60"
              height="20"
              fill="#efefef"
              stroke="#000"
              strokeWidth="0.5"
            />
            <text x="-75" y={y + 20}>
              {value}
            </text>
          </g>
        );
      });
  };

  renderRect = () => {
    const { width, height, margin, rects, offset, limit } = this.state;
    return rects.slice(offset, offset + limit).map((value, index) => {
      const y = index * (height + margin) + 35;
      return (
        <g key={index} transform={'translate(0, ' + y + ')'}>
          <rect
            width={width}
            height={height}
            x={'15'}
            y={'0'}
            stroke="black"
            fill="white"
          />
          <text y="17" x="30">
            {value.name}
          </text>
        </g>
      );
    });
  };

  renderRectGroup = () => {
    const { rects, limit } = this.state;
    return (
      <g className="rect-group">
        <rect
          width="150"
          height={this.getRectGroupHeight() + 60}
          strokeDasharray="5,2"
          strokeLinecap="butt"
          stroke="black"
          fill="white"
        />
        <text y="25" x="15">
          total: {rects.length} nodes
        </text>
        <foreignObject x="125" y="5">
          <form>
            <i
              className="fa fa-compress compress-button"
              onClick={this.onClickCompress}
              aria-hidden="true"
            />
          </form>
        </foreignObject>
        {this.renderRect()}
        {rects.length > limit && this.renderScrollButton()}
      </g>
    );
  };

  renderGroup = () => {
    const { rects, pos, overalHeight } = this.state;
    const offsetY = pos.y - overalHeight / 2 - 10;
    return (
      <g transform={`translate(0, ${offsetY})`}>
        <rect
          width="150"
          height={this.state.overalHeight}
          x="0"
          stroke="black"
          fill="white"
        />
        <text className="node-label" y="35" x="30" fill="black">
          {rects.length} Nodes
        </text>
        <g className="plus-button" onClick={this.onClickPlus}>
          <rect width="20" height="20" x="0" stroke="black" fill="white" />
          <text className="plus-sign" y="15" x="5" fill="black">
            +
          </text>
        </g>
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

  renderVerticalScrollButton() {
    return (
      <foreignObject x="-150" y={this.getRectGroupHeight() / 2 + 10}>
        <form className="">
          <i
            className="fa fa-chevron-up up-button"
            onClick={this.onVerticalClickUp}
            aria-hidden="true"
          />
          <i
            className="fa fa-chevron-down down-button"
            onClick={this.onVerticalClickDown}
            aria-hidden="true"
          />
        </form>
      </foreignObject>
    );
  }

  render() {
    const { expanded, edgeExpanded, pos } = this.state;
    return (
      <g
        id={this.props.id}
        transform={'translate(' + pos.x + ', ' + pos.y + ')'}
      >
        {expanded && this.renderRectGroup()}
        {!expanded && this.renderGroup()}
        {!expanded && !edgeExpanded && this.renderLinks()}
        {!expanded && edgeExpanded && this.renderEdgeGroup()}
        {expanded && this.renderLinksGroup()}
      </g>
    );
  }
}