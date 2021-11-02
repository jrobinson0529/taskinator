import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const handleClick = () => {
    history.push(`/cart/${user.id}`);
  };

  return (
    <div>
      <Navbar className="nav" dark light expand="md">
        <NavbarBrand href="/">
          <img
          src="https://user-images.githubusercontent.com/76854545/139541065-de118223-26e2-404d-8197-f31e2325c907.png"
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
            <NavItem>
              <Link className="nav-link" to="/services">Robot Services</Link>
            </NavItem>
          </Nav>
          { user !== null
            && <div className='auth-btn-container'>
                {
                  user
                    ? <NavItem>
                        <Link className="nav-link" to="/cart/:id" ><Button onClick={() => handleClick()}><i className="fas fa-shopping-cart" ></i></Button></Link>
                        <Button className="signOut" onClick={signOutUser}>Sign Out</Button>
                      </NavItem>
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
