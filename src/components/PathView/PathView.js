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

    const nodes = this.relocateNodes(sampleNode);

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
      .call(zoomListener)
      .on('dblclick.zoom', null);
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

  relocateNodes(nodes) {
    let newNodes = [];
    nodes.forEach(item => {
      item.Nodes.forEach((node, key1) => {
        if (key1 != item.Nodes.length - 1) {
          const nodeKey = {
            name: node.name,
            label: node.label,
            next: item.Nodes[key1 + 1].name,
            edge: item.Edges[key1],
          };
          if (!newNodes[key1]) newNodes[key1] = new Array();
          let nodeIndex = 0;
          if (
            newNodes[key1].filter(e => {
              return e.name == nodeKey.name;
            }).length == 0
          ) {
            newNodes[key1].push({
              name: nodeKey.name,
              label: nodeKey.label,
              next: [],
              nnodes: 1,
            });
            nodeIndex = newNodes[key1].length - 1;
          }
          if (
            newNodes[key1].filter((e, index) => {
              if (e.name == nodeKey.name) {
                nodeIndex = index;
              }
              return e.name == nodeKey.name;
            }).length == 1
          ) {
            newNodes[key1][nodeIndex].nnodes++;
          }
          if (
            newNodes[key1][nodeIndex].next.filter(e => {
              return e.name == nodeKey.next && e.edge.type == nodeKey.edge.type;
            }).length == 0
          ) {
            newNodes[key1][nodeIndex].next.push({
              name: nodeKey.next,
              edge: nodeKey.edge,
            });
          }
        } else {
          const nodeKey = {
            name: node.name,
            label: node.label,
          };
          if (!newNodes[key1]) newNodes[key1] = [];
          if (
            newNodes[key1].filter(e => {
              return e.name == node.name;
            }).length == 0
          ) {
            if (
              newNodes[key1].filter(e => {
                return e.name == nodeKey.name;
              }).length == 0
            ) {
              newNodes[key1].push({
                name: nodeKey.name,
                label: nodeKey.label,
              });
            }
          }
        }
      });
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
      const margin = 300;
      const pos = {
        x: margin * index,
        y: 100,
      };
      return (
        <NodeGroup
          key={index}
          id={'node' + index}
          nodes={node}
          last={index == nodes.length-1}
          expanded={node.expanded}
          edgeExpanded={node.edgeExpanded}
          pos={pos}
          onToggleExpand={this.onToggleExpand.bind(this, index)}
          onToggleEdgeExpand={this.onToggleEdgeExpand.bind(this, index)}
          onEdgeClick={this.onEdgeClick.bind(this)}
          onNodeClick={this.onNodeClick.bind(this)}
        />
      );
    });
  }

  render() {
    const isVisible =
      this.props.status === LOAD_STATUS_TYPE.LOADED ? true : false;
    return (
      <div className="path-view">
        <svg className="svgContainer" width="100%" height="100%">
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
            {this.renderFlow()}
          </g>
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
