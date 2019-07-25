import React, { Component } from 'react';

// REACTSTRAP
import { Modal } from 'reactstrap';

// COMPONENTS
import ReauthenticateForm from '../ReauthenticateForm';
import Confirmation from './Confirmation';

class DeleteUserModal extends Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        {!this.props.isReauthenticated ? (
          <ReauthenticateForm
            toggle={this.props.toggle}
            setIsReauthenticated={this.props.setIsReauthenticated}
            renderNotification={this.props.renderNotification}
          />
        ) : (
          <Confirmation
            toggle={this.props.toggle}
            renderNotification={this.props.renderNotification}
            deleteUser={this.props.deleteUser}
            deletePending={this.props.deletePending}
          />
        )}
      </Modal>
    );
  }
}

export default DeleteUserModal;