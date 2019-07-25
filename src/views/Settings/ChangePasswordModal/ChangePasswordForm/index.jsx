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

class ChangePasswordForm extends Component {
  validationSchema = yup.object().shape({
    passwordChange: yup.string()
      .required('Missing password')
      .min(8, 'Min 8 characters required'),
    passwordChangeConfirm: yup.string()
      .required('Confirm your password')
      .oneOf([yup.ref('passwordChange'), null], 'Passwords aren\'t the same')
  });

  render() {
    return (
      <Formik
        initialValues={{ passwordChange: '', passwordChangeConfirm: '' }}
        validateOnChange={false}
        validationSchema={this.validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          this.props.firebaseStore
            .changePassword(values.passwordChange)
            .then(() => {
              setSubmitting(false);
              this.props.toggle();
              this.props.renderNotification('Your password has been successfully changed', 'success');
            })
            .catch(err => {
              console.error(err);
              setSubmitting(false);
              this.props.renderNotification(err.message, 'danger');
            })
        }}
        render={({ values, errors, handleChange, handleSubmit, isSubmitting }) => {
          return (
            <>
              <ModalHeader toggle={this.props.toggle}>Change your password</ModalHeader>
              <ModalBody>
                <Col>
                  <Form className="mt-3" onSubmit={handleSubmit} autoComplete="off">
                    <FormGroup>
                      <Input type="password" id="passwordChange" placeholder="Password" value={values.passwordChange} onChange={handleChange} />
                      {errors.passwordChange ? <span className="small text-danger">{errors.passwordChange}</span> : null}
                    </FormGroup>
                    <FormGroup>
                      <Input type="password" id="passwordChangeConfirm" placeholder="Confirm password" value={values.passwordChangeConfirm} onChange={handleChange} />
                      {errors.passwordChangeConfirm ? <span className="small text-danger">{errors.passwordChangeConfirm}</span> : null}
                    </FormGroup>
                    <hr />
                    <div className="text-right mt-2">
                      {isSubmitting && <i className="fas fa-circle-notch fa-spin mr-2"></i>}
                      <Button color="warning" type="submit" disabled={isSubmitting}>Change password</Button>
                      <Button color="link" onClick={this.props.toggle}>Cancel</Button>
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

export default inject('firebaseStore')(observer(ChangePasswordForm));