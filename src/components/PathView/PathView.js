import React from 'react';
import PropTypes, { node } from 'prop-types';
import { Container, Form, Button } from 'semantic-ui-react';
import Connect from '../../utils/connect';
import * as d3 from 'd3';
import * as d3force from 'd3-force';
import { NodeGroup } from '../NodeGroup';
import { NodeBlock } from '../NodeBlock';
import sampleNode from '../../assets/sample.js';
import './styles.css';
import { dispatch } from 'd3';
import { LOAD_STATUS_TYPE } from './../../constants'
import { setFilterEdge, setFilterNode } from './../../redux/filter';
import { setNodeValues } from './../../redux/path';
class PathView extends React.Component {
  static propTypes = {
    setFilterEdge: PropTypes.func.isRequired,
    setFilterNode: PropTypes.func.isRequired,
    setNodeValues: PropTypes.func.isRequired,
    status: PropTypes.any,
  };

  constructor(props) {
    super(props);

    const nodes = this.relocateNodes(sampleNode, 100);

    this.state = {
      nodes: nodes,
      baseSvg: null,
      width: this.props.width,
      height: this.props.height,
      isMouseDown: false,
      editLabel:
        typeof this.props.editLabel !== 'undefined'
          ? this.props.editLabel
          : false,
      transform: {
        k: 1,
        x: 0,
        y: 0,
      },
    };

    this.props.setNodeValues(nodes);
  }

  componentWillMount() {}

  componentDidMount() {
    const that = this;
    const zoomListener = d3
      .zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', () => {
        that.onZoomHandler(d3.event);
      });
    const baseSvg = d3
      .select('.svgContainer')
      .on('mousedown', function() {
        that.onMouseDownHandler(d3.mouse(this), d3.event);
      })
      .on('mousemove', function() {
        that.onMouseMoveHandler();
      })
      .on('mouseup', function() {
        that.onMouseUpHandler();
      })
      .on('click', function() {
        that.onClickHandler(d3.mouse(this), d3.event);
      })
      .call(zoomListener);
  }

  componentWillReceiveProps(nextProps) {}

  componentDidUpdate(prevProps, prevState) {}

  onZoomHandler(event) {
    this.updateTransform(event.transform);
    this.setState({
      transform: event.transform,
    });
  }

  onClickHandler(pos, event) {
    if (event.target.tagName === 'svg' && this.props.mouseDown) {
      const newPos = this.zoomedPosition(this.state.transform, pos[0], pos[1]);
      this.props.mouseDown(newPos);
    }
  }

  onMouseDownHandler(pos, event) {
    this.setState({
      isMouseDown: true,
    });
  }

  onMouseUpHandler() {
    this.setState({
      isMouseDown: false,
    });
    if (this.props.mouseUp) {
      this.props.mouseUp(d3.event);
    }
  }

  onMouseMoveHandler() {
    if (this.props.mouseMove) {
      this.props.mouseMove(d3.event);
    }
  }

  updateTransform(transform) {
    if (this.props.updateTransform) {
      this.props.updateTransform(transform);
    }
  }

  zoomedPosition(transform, x, y) {
    const transX = transform.x;
    const transY = transform.y;
    const scale = transform.k;

    const newX = (x - transX) / scale;
    const newY = (y - transY) / scale;

    return [newX, newY];
  }

  relocateNodes(nodes, y) {
    let newNodes = [];
    const margin = 300;
    nodes.forEach((nodes, index) => {
      const nodeObj = {};
      let edges = [];
      nodes.Edges.forEach(edge => {
        edges = [...edges, ...edge.pmids];
      });
      nodeObj.nodes = nodes.Nodes;
      nodeObj.pos = {
        x: (index + 1) * margin,
        y: y,
      };
      nodeObj.edges = edges;
      nodeObj.expanded = false;
      nodeObj.edgeExpanded = false;
      newNodes.push(nodeObj);
    });
    return newNodes;
  }

  onToggleExpand(index, value) {
    const nodes = [...this.state.nodes];
    for (let key in nodes) {
      nodes[key].expanded = false;
    }
    nodes[index].expanded = value;
    this.setState({
      nodes: nodes,
    });
  }

  onToggleEdgeExpand(index, value) {
    const nodes = [...this.state.nodes];
    for (let key in nodes) {
      nodes[key].edgeExpanded = false;
    }
    nodes[index].edgeExpanded = value;
    this.setState({
      nodes: nodes,
    });
  }

  onEdgeClick(value) {
    this.props.setFilterEdge(value);
  }

  onNodeClick(value) {
    this.props.setFilterNode(value.name);
  }

  renderFlow() {
    const { nodes } = this.state;
    return nodes.map((node, index) => {
      return (
        <NodeGroup
          key={index}
          id={'node' + index}
          nodes={node.nodes}
          expanded={node.expanded}
          edgeExpanded={node.edgeExpanded}
          edges={node.edges}
          connect={index !== 0 && nodes[index - 1]}
          pos={node.pos}
          onToggleExpand={this.onToggleExpand.bind(this, index)}
          onToggleEdgeExpand={this.onToggleEdgeExpand.bind(this, index)}
          onEdgeClick={this.onEdgeClick.bind(this)}
          onNodeClick={this.onNodeClick.bind(this)}
        />
      );
    });
  }

  render() {
    const lastPosX = this.state.nodes[this.state.nodes.length - 1].pos.x + 200;
    const lastPos = { x: lastPosX, y: 0 };
    const isVisible =
      this.props.status === LOAD_STATUS_TYPE.LOADED ? true : false;
    return (
      <div className="path-view">
        <svg className="svgContainer" width="100%" height="100%">
          {isVisible && (
            <g
              className="subContainer"
              transform={
                'translate(' +
                this.state.transform.x +
                ', ' +
                this.state.transform.y +
                ')scale(' +
                this.state.transform.k +
                ')'
              }
            >
              <NodeBlock />
              {this.renderFlow()}
              <NodeBlock pos={lastPos} last={true} />
            </g>
          )}
        </svg>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: state.filter.status,
});

const mapDispatchToProps = dispatch => ({
  setFilterEdge: data => dispatch(setFilterEdge(data)),
  setFilterNode: data => dispatch(setFilterNode(data)),
  setNodeValues: data => dispatch(setNodeValues(data)),
});

export default Connect(mapStateToProps, mapDispatchToProps)(PathView);
