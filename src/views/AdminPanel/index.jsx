import React, { Component } from 'react';

// ROUTER
import { withRouter, Link } from 'react-router-dom';

// ROUTES
import * as routes from '../../constants/routes/index';

// REACTSTRAP
import { Col, Nav, NavItem, Row, Spinner } from 'reactstrap';

// MOBX
import { inject, observer } from 'mobx-react';

// COMPONENTS
import ReactNotification from 'react-notifications-component';
import UsersTable from './UsersTable';

class AdminPanel extends Component {
  state = {
    activeTab: this.props.location.pathname === '/panel/general' ? 'general' : 'users'
  };

  componentDidMount = async () => {
    const { firebaseStore } = this.props;

    try {
      await firebaseStore.getUsers(0, firebaseStore.usersLimit);
      console.log(this.props.firebaseStore.users);
    } catch (err) {
      this.renderNotification('Couldn\'t load users', 'danger');
    }
  };

  componentDidUpdate = async (prevProps) => {
    const { firebaseStore } = this.props;

    if (prevProps.match.params.num !== this.props.match.params.num) {
      try {
        await firebaseStore.getUsers((this.props.match.params.num - 1) * firebaseStore.usersLimit, this.props.match.params.num * firebaseStore.usersLimit);
      } catch (err) {
        this.renderNotification('Couldn\'t load users', 'danger');
      }
    }
  }

  refNotification = React.createRef();

  renderNotification = (message, type) => {
    this.refNotification.current.addNotification({
      title: type === 'danger' ? "Error" : "Success",
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 3000 },
      dismissable: { click: true }
    })
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  render() {
    const { USERS_PENDING } = this.props.firebaseStore;
    const { activeTab } = this.state;

    return (
      <>
        <Row className="mb-3">
          <Col>
            <small className="breadcrumbs text-muted">
              <Link to={routes.DASHBOARD}>Home</Link> {'/ '}
              Admin panel
            </small>
          </Col>
        </Row>
        <Row className="pb-4">
          <Col>
            <h2 className="page-title">Admin panel</h2>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <Nav tabs>
              <NavItem>
                <Link
                  to={routes.ADMIN_PANEL_GENERAL}
                  className={"nav-link " + (activeTab === 'general' ? 'active' : '')}
                  onClick={() => { this.toggle('general'); }}
                >
                  General
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to={`${routes.ADMIN_PANEL_USERS}/page/1`}
                  className={"nav-link " + (activeTab === 'users' ? 'active' : '')}
                  onClick={() => { this.toggle('users'); }}
                >
                  Users
                </Link>
              </NavItem>
            </Nav>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col>
            {activeTab === 'users' ? (
              USERS_PENDING ? (
                <div className="d-flex justify-content-center my-5">
                  <Spinner />
                </div>
              ) : (
                <UsersTable />
              )
            ) : (
              <div> </div>
            )}
          </Col>
        </Row>
        <ReactNotification ref={this.refNotification} />
      </>
    )
  }
}

export default withRouter(inject('firebaseStore')(observer(AdminPanel)));
