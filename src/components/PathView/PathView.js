import React from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import Connect from '../../utils/connect';
import './styles.css';

class PathView extends React.Component {
  render() {
    const { isMobile } = this.props;

    return (
      <div>
        <h4>PathView</h4>
      </div>
    );
  }
}

export default Connect(null)(PathView);
