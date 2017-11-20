import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import './styles.css';

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
    onEdgeClick: PropTypes.func,
    onNodeClick: PropTypes.func,
  };

  constructor(props) {
    super(props);
    let edges = [];
    if (this.props.nodes) {
      this.props.nodes.forEach(element => {
        if (element.next) {
          element.next.forEach(item => {
            edges = edges.concat(item.edge.pmids);
          });
        }
      });
    }
    this.state = {
      width: 120,
      height: 25,
      overalHeight: 60,
      pos: this.props.pos ? this.props.pos : { x: 0, y: 0 },
      edges: edges,
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
      this.setState({
        edgeExpanded: nextProps.edgeExpanded,
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
    if (rects.length == 1) {
      return height;
    } else if (rects.length > limit) {
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
      return this.getRectGroupHeight() / 2;
    } else {
      return this.state.overalHeight;
    }
  };

  renderLinks = () => {
    return (
      <g className="edges">
        <line
          x1="150"
          y1={30}
          x2="300"
          y2={30}
          strokeWidth="2"
          stroke="black"
        />
        <rect
          x="180"
          y={20}
          rx="3"
          ry="3"
          width="90"
          height="20"
          fill="#efefef"
          opacity="0.75"
          stroke="#000"
          strokeWidth="0.5"
        />
        <text y={33} x="210">
          {this.state.edges.length} edges
        </text>
        <foreignObject x="265" y={15}>
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
          key={index}
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
    const {
      height,
      margin,
      edges,
      edgeOffset,
      edgeLimit,
      pos,
      overalHeight,
    } = this.state;
    const offsetY = this.getRectGroupHeight() / 2;
    const curveOffset = 50;
    const limitLength = (edges.length > edgeLimit) ? edgeLimit : edges.length;
    const curveRange = curveOffset * limitLength;
    return edges
      .slice(edgeOffset, edgeOffset + edgeLimit)
      .map((value, index) => {
        const y = pos.y - overalHeight / 2 + index * (height + margin);
        let x1 = 0;
        if (this.state.edges.length > this.state.edgeLimit) x1 = -130;
        const offset = curveOffset * index - curveRange / 2;
        return (
          <g key={index} transform={'translate(0, 30)'}>
            <path d={`M150,0C150,0,240,${offset},300,0`} fill="none" stroke="#000" />
            <g transform={'translate(120, ' + offset / 2 + ')'}>
              <rect
                x="70"
                y={5}
                rx="3"
                ry="3"
                width="60"
                height="20"
                fill="#efefef"
                stroke="#000"
                strokeWidth="0.5"
                onClick={this.props.onEdgeClick.bind(this, value)}
              />
              <text
                className="filter-text"
                x="75"
                y={20}
                onClick={this.props.onEdgeClick.bind(this, value)}
              >
                {value}
              </text>
            </g>
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
            onClick={this.props.onNodeClick.bind(this, value)}
          />
          <text
            className="filter-text"
            y="17"
            x="30"
            onClick={this.props.onNodeClick.bind(this, value)}
          >
            {value.name}
          </text>
        </g>
      );
    });
  };

  renderRectGroup = () => {
    const { rects, pos, overalHeight, limit } = this.state;
    const offsetY = (this.getRectGroupHeight() + 60 - overalHeight) / 2;
    return (
      <g className="rect-group" transform={`translate(0, -${offsetY})`}>
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
      <g transform={`translate(0, 0)`}>
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
      <foreignObject x="150" y={10}>
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
    const last = this.props.last;
    return (
      <g
        id={this.props.id}
        transform={'translate(' + pos.x + ', ' + pos.y + ')'}
      >
        {expanded && this.renderRectGroup()}
        {!expanded && this.renderGroup()}
        {!last && !edgeExpanded && this.renderLinks()}
        {!last && !expanded && edgeExpanded && this.renderEdgeGroup()}
      </g>
    );
  }
}
