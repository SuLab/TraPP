import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';
import Connect from '../../utils/connect';
import './styles.css';

class NavBar extends React.Component {
  render() {
    return (
      <Menu className="navbar" color="teal" inverted borderless>
        <Menu.Item>
          <Link to="/">
            <h2>Reasoner Demo</h2>
          </Link>
        </Menu.Item>
        <Menu.Item position="right" name="home">
          Home
        </Menu.Item>
        <Menu.Item name="about">About</Menu.Item>
        <Menu.Item name="help">Help</Menu.Item>
      </Menu>
    );
  }
}

export default Connect(null)(NavBar);
