import React from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import Connect from '../../utils/connect';
import './styles.css';

class PathForm extends React.Component {
  render() {
    const { isMobile } = this.props;

    return (
      <div className="path-form">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input label="Enter Object1" placeholder="Enter Object1" />
            <Form.Input label="Enter Object2" placeholder="Enter Object2" />
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

export default Connect(null)(PathForm);
