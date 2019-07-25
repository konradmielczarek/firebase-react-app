import React, { Component } from 'react';

// ROUTER
import { Link } from 'react-router-dom';

// ROUTES
import * as routes from '../../constants/routes/index';

// REACTSTRAP
import { Card, CardBody, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';

// COMPONENTS
import LoadingButton from '../../components/common/LoadingButton';
import ReactNotification from 'react-notifications-component';
import Footer from '../../components/common/Footer';

// MOBX
import { inject, observer } from 'mobx-react';

class Login extends Component {
  state = {
    isLoading: false,
    username: '',
    password: ''
  };

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

  submit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });

    this.props.firebaseStore.logInUser(this.state.username, this.state.password)
      .then(res => {
        this.setState({ isLoading: false });
        console.log(res);
        this.props.history.push(routes.DASHBOARD);
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });

        switch (err.code) {
          case 'auth/wrong-password':
            this.renderNotification('Invalid credentials');
            break;
          case 'auth/user-disabled':
            this.renderNotification('User has been disabled');
            break;
          case 'auth/user-not-found':
            this.renderNotification('User does not exist');
            break;
          default:
            this.renderNotification(err.message);
        }
      });
  }

  render() {
    const { isLoading, username, password } = this.state;

    return (
      <>
        <div className="wrapper">
          <Container>
            <Row>
              <Col className="mx-auto" sm="9" md="7" lg="5" xl="4">
                <Card className="card-login">
                  <CardBody>
                    <h2 className="text-center">Welcome!</h2>
                    <Form onSubmit={this.submit} className="mt-3">
                      <FormGroup>
                        <Input data-cy="username-login" type="email" id="username-login" placeholder="Username" value={username} onChange={e => this.setState({ username: e.target.value })} required />
                      </FormGroup>
                      <FormGroup>
                        <Input data-cy="password-login" type="password" id="password-login" placeholder="Password" value={password} onChange={e => this.setState({ password: e.target.value })} required />
                      </FormGroup>
                      <LoadingButton data-cy="sign-in-btn" className="btn-block" id="sign-in-btn" isLoading={isLoading} disabled={isLoading}>Sign in</LoadingButton>
                    </Form>
                    <div className="mt-2 text-center">
                    <p className="text-muted m-0">
                      You are not a user? {' '}
                      <Link data-cy="create-account-link" to={routes.REGISTER}>Create account!</Link>
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

export default inject('firebaseStore')(observer(Login));