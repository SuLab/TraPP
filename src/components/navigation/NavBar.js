import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';
import Connect from '../../utils/connect';
import logo from '../../assets/logo.svg';
import './styles.css';

class NavBar extends React.Component {
  render() {
    const { isMobile } = this.props;

    return (
      <Menu className="navbar" color="teal" inverted borderless>
        <Menu.Item>
          <Link to="/">
            <Image src={logo} size={isMobile ? 'mini' : 'tiny'} />
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Connect(
  null
)(NavBar);
