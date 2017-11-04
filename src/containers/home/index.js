import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';
import { Connect } from '../../utils';
import { PathForm } from './../../components/PathForm';
import { PathFilter } from './../../components/PathFilter';
import { PathView } from './../../components/PathView';
import './styles.css';

class Home extends React.Component {
  render() {
    return (
      <Container>
        <PathForm />
        <Grid>
          <Grid.Column width={10}>
            <PathView />
          </Grid.Column>
          <Grid.Column width={6}>
            <PathFilter />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(Connect(null)(Home));
