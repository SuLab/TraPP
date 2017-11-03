import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { Connect } from '../../utils';
import './styles.css';

class Home extends React.Component {
  render() {
    return (
      <Container>
        <h2 className="t-align-center">
          Welcome
        </h2>
      </Container>
    );
  }
}

export default withRouter(Connect(
  null
)(Home));
