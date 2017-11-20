import React from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Button } from 'semantic-ui-react';
import Connect from '../../utils/connect';
import { setLoadStatus } from '../../redux/filter';
import './styles.css';

class PathForm extends React.Component {
  static propTypes = {
    setLoadStatus: PropTypes.func.isRequired,
    pathCount: PropTypes.number,
    edgeCount: PropTypes.number,
    nodeCount: PropTypes.number,
  };

  constructor(props) {
    super(props);
  }

  handleSubmit() {
    this.props.setLoadStatus();
  }

  render() {
    const { pathCount, edgeCount, nodeCount } = this.props;
    return (
      <div className="path-form">
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group>
            <Form.Input
              label="Enter Object1"
              placeholder="Enter Object1"
              value="Chlorcyclizine"
            />
            <Form.Input
              label="Enter Object2"
              placeholder="Enter Object2"
              value="Asthma"
            />
            <Form.Button positive size="small">
              Find Path
            </Form.Button>
          </Form.Group>
        </Form>
        <h4>
          Total {pathCount} paths found ({nodeCount} nodes and {edgeCount}{' '}
          edges), {pathCount} paths ({nodeCount} nodes and {edgeCount} edges)
          displayed
        </h4>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  pathCount: state.path.pathCount,
  edgeCount: state.path.edgeCount,
  nodeCount: state.path.nodeCount,
});

const mapDispatchToProps = dispatch => ({
  setLoadStatus: () => dispatch(setLoadStatus()),
});

export default Connect(mapStateToProps, mapDispatchToProps)(PathForm);
