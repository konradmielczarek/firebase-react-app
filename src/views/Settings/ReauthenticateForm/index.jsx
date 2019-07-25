import React, { Component } from 'react';

// REACTSTRAP
import {
  Button,
  Col,
  Input,
  Form,
  FormGroup,
  ModalHeader,
  ModalBody
} from 'reactstrap';

// MOBX
import { inject, observer } from 'mobx-react';

// FORMIK
import { Formik } from 'formik';
import * as yup from 'yup';

class ReauthenticateForm extends Component {
  validationSchema = yup.object().shape({
    currentPassword: yup.string()
      .required('Missing password')
  });

  render() {
    return (
      <Formik
        initialValues={{ currentPassword: '' }}
        validateOnChange={false}
        validationSchema={this.validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          this.props.firebaseStore
            .reauthenticate(values.currentPassword)
            .then(() => {
              setSubmitting(false);
              this.props.setIsReauthenticated();
            })
            .catch(err => {
              console.error(err);
              setSubmitting(false);

              switch (err.code) {
                case 'auth/wrong-password':
                  this.props.renderNotification('Invalid password', 'danger');
                  break;
                default:
                  this.props.renderNotification(err.message, 'danger');
              }
            })
        }}
        render={({ values, errors, handleChange, handleSubmit, isSubmitting }) => {
          return (
            <>
              <ModalHeader toggle={this.props.toggle}>Confirm your current password</ModalHeader>
              <ModalBody>
                <Col>
                  <Form className="mt-3" onSubmit={handleSubmit} autoComplete="off">
                    <FormGroup>
                      <Input type="password" id="currentPassword" placeholder="Current password" value={values.currentPassword} onChange={handleChange} />
                      {errors.currentPassword ? <span className="small text-danger">{errors.currentPassword}</span> : null}
                    </FormGroup>
                    <hr />
                    <div className="text-right mt-2">
                      {isSubmitting && <i className="fas fa-circle-notch fa-spin mr-2"></i>}
                      <Button color="warning" id="confirm-password-btn" type="submit" disabled={isSubmitting}>Confirm password</Button>
                      <Button color="link" id="cancel-btn" onClick={this.props.toggle}>Cancel</Button>
                    </div>
                  </Form>
                </Col>
              </ModalBody>
            </>
          )
        }}
      />
    );
  }
}

export default inject('firebaseStore')(observer(ReauthenticateForm));