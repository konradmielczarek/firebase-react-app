import React, { Component } from 'react';

// REACTSTRAP
import {
  Button,
  ModalHeader,
  ModalBody
} from 'reactstrap';

class Confirmation extends Component {
  render() {
    return (
      <>
        <ModalHeader toggle={this.props.toggle}>Are you sure?</ModalHeader>
        <ModalBody>
          Are you sure you want to delete your account? This will be irreversible.
          <hr />
          <div className="text-right mt-2">
            {this.props.deletePending && <i className="fas fa-circle-notch fa-spin mr-2"></i>}
            <Button
              color="danger"
              onClick={this.props.deleteUser}
              disabled={this.props.deletePending}
              id="delete-account-btn"
              data-cy="confirm-delete-account-btn"
            >
              Delete account
            </Button>
            <Button color="link" onClick={this.props.toggle} id="cancel-delete-btn">Cancel</Button>
          </div>
        </ModalBody>
      </>
    );
  }
}

export default Confirmation;