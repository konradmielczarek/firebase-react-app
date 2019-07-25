import React, { Component } from 'react';

// REACTSTRAP
import { Modal } from 'reactstrap';

// COMPONENTS
import ReauthenticateForm from '../ReauthenticateForm';
import ChangePasswordForm from './ChangePasswordForm';

class ChangePasswordModal extends Component {
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
          <ChangePasswordForm
            toggle={this.props.toggle}
            renderNotification={this.props.renderNotification}
          />
        )}
      </Modal>
    );
  }
}

export default ChangePasswordModal;