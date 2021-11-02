import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
} from 'reactstrap';
import { signInUser, signOutUser } from '../helpers/auth';

const NavBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="nav" light expand="md">
        <NavbarBrand href="/">
          <img
          src="https://user-images.githubusercontent.com/76854545/139351226-1ecd53ab-eb5f-426a-9aa0-977900e73ec2.png"
          width="180"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className="nav-link" to={`/user/${user?.id}`}>Users</Link>
            </NavItem>
          </Nav>
          { user !== null
            && <div className='auth-btn-container'>
                {
                  user ? <Button className="signOut" onClick={signOutUser}>Sign Out</Button>
                    : <Button className="signIn" onClick={signInUser}>Sign In</Button>
                }
              </div>
            }
        </Collapse>
      </Navbar>
    </div>
  );
};
NavBar.propTypes = {
  user: PropTypes.any
};
export default NavBar;
