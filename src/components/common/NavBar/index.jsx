import React, { Component } from 'react';

// ROUTER
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

// REACTSTRAP
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

// ROUTES
import * as routes from '../../../constants/routes';

// MOBX
import { inject, observer } from 'mobx-react';

class NavBar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => this.setState(prevState => ({ isOpen: !prevState.isOpen }));

  handleLogOut = () => {
    this.props.firebaseStore.logOut();
    this.props.history.push(routes.LOGIN);
  };

  render() {
    const { isOpen } = this.state;
    const { isAdmin, authenticatedUser } = this.props.firebaseStore;

    return (
      <Navbar color="light" light expand="sm">
        <Link to={routes.DASHBOARD} className="navbar-brand" data-cy="home-link">
          <i className="fas fa-graduation-cap"></i>{' '}
          <span className="font-italic">Master's App</span>
        </Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="d-flex align-items-center mr-3">
              {authenticatedUser}
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav className="navigation-item" data-cy="dropdown-user-btn">
                <i className="fas fa-user d-none d-sm-block"></i>
                <span className="d-block d-sm-none">
                  <i className="fas fa-user mr-2"></i>
                  User
                </span>
              </DropdownToggle>
              <DropdownMenu right>
                {
                  isAdmin && (
                    <Link to={routes.ADMIN_PANEL_GENERAL} className="dropdown-link" data-cy="admin-panel-btn">
                      <DropdownItem>
                        <span className="icon-box">
                          <i className="fas fa-user-shield mr-2"></i>
                        </span>
                        Admin panel
                      </DropdownItem>
                    </Link>
                  )
                }
                <Link to={routes.SETTINGS} className="dropdown-link" data-cy="settings-btn">
                  <DropdownItem>
                    <span className="icon-box">
                      <i className="fas fa-cog mr-2"></i>
                    </span>
                   Settings
                  </DropdownItem>
                </Link>
                <DropdownItem divider />
                <DropdownItem onClick={this.handleLogOut} data-cy="sign-out-btn">
                  <span className="icon-box">
                    <i className="fas fa-sign-out-alt mr-2"></i>
                  </span>
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default withRouter(inject('firebaseStore')(observer(NavBar)));
