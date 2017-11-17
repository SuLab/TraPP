import React from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Button } from 'semantic-ui-react';
import Connect from '../../utils/connect';
import { setLoadStatus } from '../../redux/filter';
import './styles.css';

class PathForm extends React.Component {
  static propTypes = {
    setLoadStatus: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  handleSubmit() {
    this.props.setLoadStatus();
  }

  render() {
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
          Total XXX paths found (XXX nodes and XXX edges), XX paths (XX nodes
          and XX edges) displayed
        </h4>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setLoadStatus: () => dispatch(setLoadStatus()),
});

export default Connect(null, mapDispatchToProps)(PathForm);
