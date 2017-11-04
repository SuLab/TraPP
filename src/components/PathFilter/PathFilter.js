import React from 'react';
import { Form, Radio, Grid, List, Button } from 'semantic-ui-react';
import Connect from '../../utils/connect';
import './styles.css';

class PathFilter extends React.Component {
  state = {
    must: true,
    type: true,
    contain: true,
  };
  handleChange = (type, value) => {
    switch (type) {
      case 'must':
        return this.setState({ must: value });
      case 'type':
        return this.setState({ type: value });
      case 'contain':
        return this.setState({ contain: value });
    }
  };

  render() {
    const { isMobile } = this.props;
    const { must, type, contain } = this.state;
    const radioType = { must: 'must', type: 'type', contain: 'contain' };
    return (
      <div>
        <h3>PathFilter:</h3>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <Radio
                    label="must"
                    name="radioMustGroup"
                    value="must"
                    checked={must}
                    onChange={this.handleChange.bind(
                      this,
                      radioType.must,
                      true
                    )}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="must not"
                    name="radioMustGroup"
                    value="must not"
                    checked={!must}
                    onChange={this.handleChange.bind(
                      this,
                      radioType.must,
                      false
                    )}
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <Radio
                    label="Nodes"
                    name="radioTypeGroup"
                    value="Nodes"
                    checked={type}
                    onChange={this.handleChange.bind(
                      this,
                      radioType.type,
                      true
                    )}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Edges"
                    name="radioTypeGroup"
                    value="Edges"
                    checked={!type}
                    onChange={this.handleChange.bind(
                      this,
                      radioType.type,
                      false
                    )}
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <Radio
                    label="contain"
                    name="radioMatchGroup"
                    value="contain"
                    checked={contain}
                    onChange={this.handleChange.bind(
                      this,
                      radioType.contain,
                      true
                    )}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="exact match"
                    name="radioMatchGroup"
                    value="exact match"
                    checked={!contain}
                    onChange={this.handleChange.bind(
                      this,
                      radioType.contain,
                      false
                    )}
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row>
            <Form>
              <Form.Group>
                <Form.Input name="serachTerm" />
                <Form.Button content="Add" />
              </Form.Group>
            </Form>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row>
            <h3>Current Filters:</h3>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <List size="mini">
                <List.Item>
                  <List.Content verticalAlign="middle" floated="right">
                    <Button size="mini">-</Button>
                  </List.Content>
                  <List.Content verticalAlign="middle">
                    <h5>
                      <strong>must</strong> have <strong>Node</strong> exactly
                      matches <strong>Gene1</strong>{' '}
                    </h5>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content verticalAlign="middle" floated="right">
                    <Button size="mini">-</Button>
                  </List.Content>
                  <List.Content verticalAlign="middle">
                    <h5>
                      <strong>must</strong> have <strong>Node</strong> exactly
                      matches <strong>Gene1</strong>{' '}
                    </h5>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content verticalAlign="middle" floated="right">
                    <Button size="mini">-</Button>
                  </List.Content>
                  <List.Content verticalAlign="middle">
                    <h5>
                      <strong>must</strong> have <strong>Node</strong> exactly
                      matches <strong>Gene1</strong>{' '}
                    </h5>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content verticalAlign="middle" floated="right">
                    <Button size="mini">-</Button>
                  </List.Content>
                  <List.Content verticalAlign="middle">
                    <h5>
                      <strong>must</strong> have <strong>Node</strong> exactly
                      matches <strong>Gene1</strong>{' '}
                    </h5>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Connect(null)(PathFilter);
