import React, { Component } from 'react';
import * as moment from 'moment';

// REACTSTRAP
import { Button, Col, Row } from 'reactstrap';

// ROUTER
import { Link } from 'react-router-dom';

// ROUTES
import * as routes from '../../constants/routes/index';

// MOBX
import { inject, observer } from 'mobx-react';

// COMPONENTS
import ChangePasswordModal from './ChangePasswordModal';
import DeleteUserModal from './DeleteUserModal';
import ReactNotification from 'react-notifications-component';

class Settings extends Component {
  state = {
    isPasswordChangeModalOpen: false,
    isDeleteUserModalOpen: false,
    isReauthenticated: false,
    DELETE_PENDING: false
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
  }

  togglePasswordChangeModal = () => {
    this.setState(prevState => ({
      isPasswordChangeModalOpen: !prevState.isPasswordChangeModalOpen,
      isReauthenticated: false
    }));
  }

  toggleDeleteUserModal = () => {
    this.setState(prevState => ({
      isDeleteUserModalOpen: !prevState.isDeleteUserModalOpen,
      isReauthenticated: false
    }));
  }

  setIsReauthenticated = () => {
    this.setState({ isReauthenticated: true });
  }

  deleteUser = () => {
    this.setState({ DELETE_PENDING: true });

    this.props.firebaseStore.deleteUser()
    .then(() => {
      this.setState({ DELETE_PENDING: false });
    })
    .catch((err) => {
      console.error(err);
      this.renderNotification(err.message, 'danger');
    })
  }


  render() {
    const { authenticatedUser, userData, isAdmin } = this.props.firebaseStore;

    return (
      <>
        <Row className="mb-3">
          <Col>
            <small className="breadcrumbs text-muted">
              <Link to={routes.DASHBOARD} data-cy="breadcrumb-home-btn">Home</Link> {'/ '}
              Settings
            </small>
          </Col>
        </Row>
        <Row>
          <Col sm="4">
            <h2 className="page-title">Settings</h2>
          </Col>
          <Col sm="8" className="text-sm-right mt-3 mt-sm-0">
            <Button color="warning" onClick={this.togglePasswordChangeModal}>Change password</Button>
            {!isAdmin && <Button color="danger" onClick={this.toggleDeleteUserModal} className="ml-2" data-cy="delete-account-btn">Delete account</Button>}
          </Col>
        </Row>
        <Row className="pb-4">
          <Col>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="6">
            <h5 className="setting-name">User data</h5>
            <p className="text-muted small">Your account's data.</p>
          </Col>
          <Col sm="12" md="6">
            <div className="setting-item">
              <p className="setting-label">Username</p>
              <p className="setting-data">{authenticatedUser}</p>
            </div>
            <div className="setting-item">
              <p className="setting-label">Account creation date</p>
              {!userData ? (
                <p>Loading...</p>
              ) : (
                <p className="setting-data">
                  {moment(userData.creationDate).format("DD.MM.YYYY") || 'N/A'}
                </p>
              )}
            </div>
          </Col>
        </Row>
        <ChangePasswordModal
          isOpen={this.state.isPasswordChangeModalOpen}
          toggle={this.togglePasswordChangeModal}
          isReauthenticated={this.state.isReauthenticated}
          setIsReauthenticated={this.setIsReauthenticated}
          renderNotification={this.renderNotification}
        />
        <DeleteUserModal
          isOpen={this.state.isDeleteUserModalOpen}
          toggle={this.toggleDeleteUserModal}
          isReauthenticated={this.state.isReauthenticated}
          setIsReauthenticated={this.setIsReauthenticated}
          renderNotification={this.renderNotification}
          deleteUser={this.deleteUser}
          deletePending={this.state.DELETE_PENDING}
        />
        <ReactNotification ref={this.refNotification} />
      </>
    )
  }
}

export default inject('firebaseStore')(observer(Settings));
