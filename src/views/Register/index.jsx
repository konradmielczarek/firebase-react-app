import React, { Component } from 'react';

// ROUTER
import { Link } from 'react-router-dom';

// FORMIK
import { Formik } from 'formik';
import * as yup from 'yup';

// REACTSTRAP
import { Card, CardBody, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';

// COMPONENTS
import LoadingButton from '../../components/common/LoadingButton';
import ReactNotification from 'react-notifications-component';
import Footer from '../../components/common/Footer';

// ROUTES
import * as routes from '../../constants/routes/index';

// MOBX
import { inject, observer } from 'mobx-react';

class Register extends Component {
  refNotification = React.createRef();

  renderNotification = (message) => {
    this.refNotification.current.addNotification({
      title: "Error",
      message: message,
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 3000 },
      dismissable: { click: true }
    })
  }

  render() {
    const validationSchema = yup.object().shape({
      email: yup.string()
        .required('Missing email')
        .email('Invalid email'),
      password: yup.string()
        .required('Missing password')
        .min(8, 'Min 8 characters required'),
      passwordConfirm: yup.string()
        .required('Confirm your password')
        .oneOf([yup.ref('password'), null], 'Passwords are not the same')
    });

    return (
      <>
        <div className="wrapper">
          <Container>
            <Row>
              <Col className="mx-auto" sm="9" md="7" lg="5" xl="4">
                <Card className="card-login">
                  <CardBody>
                    <h2 className="text-center">Register</h2>
                    <Formik
                      initialValues={{ email: '', password: '', passwordConfirm: '' }}
                      validateOnChange={false}
                      validationSchema={validationSchema}
                      onSubmit={(values, {setSubmitting}) => {
                        this.props.firebaseStore
                          .registerUser(values.email, values.password)
                          .then(res => {
                            this.props.firebaseStore.addUser(res.user.uid, values.email)
                          })
                          .then(() => {
                            setSubmitting(false);
                            this.props.history.push(routes.DASHBOARD);
                          })
                          .catch(err => {
                            console.error(err);
                            setSubmitting(false);

                            this.renderNotification(err.message);
                          })
                      }}
                      render={({ values, errors, handleChange, handleSubmit, isSubmitting }) => {
                        return (
                          <Form className="mt-3" id="register-form" onSubmit={handleSubmit} autoComplete="off">
                            <FormGroup>
                              <Input data-cy="email" type="email" id="email" placeholder="Email" value={values.email} onChange={handleChange} />
                              {errors.email ? <span className="small text-danger email-error">{errors.email}</span> : null}
                            </FormGroup>
                            <FormGroup>
                              <Input data-cy="password" type="password" id="password" placeholder="Password" value={values.password} onChange={handleChange} />
                              {errors.password ? <span className="small text-danger password-error">{errors.password}</span> : null}
                            </FormGroup>
                            <FormGroup>
                              <Input data-cy="password-confirm" type="password" id="passwordConfirm" placeholder="Confirm password" value={values.passwordConfirm} onChange={handleChange} />
                              {errors.passwordConfirm ? <span className="small text-danger confirm-password-error">{errors.passwordConfirm}</span> : null}
                            </FormGroup>
                            <LoadingButton data-cy="create-account-btn" className="btn-block" id="create-account-btn" type="submit" isLoading={isSubmitting} disabled={isSubmitting}>Create account</LoadingButton>
                          </Form>
                        )
                      }}
                    />
                    <div className="mt-2 text-center">
                      <p className="text-muted m-0" data-cy="sign-in-link">
                        You have an account? <Link to={routes.LOGIN}>Sign in!</Link>
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
        <ReactNotification ref={this.refNotification} />
      </>
    )
  }
}

export default inject('firebaseStore')(observer(Register));