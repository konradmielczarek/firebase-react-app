import React, { Component } from 'react';

// ROUTER
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// COMPONENTS
import LoginPanel from '../views/Login';
import RegisterPanel from '../views/Register';
import Dashboard from '../views/Dashboard';
import Settings from '../views/Settings';
import AdminPanel from '../views/AdminPanel';
import PrivateRoute from './common/PrivateRoute';
import AdminRoute from './common/AdminRoute';

// ROUTES
import * as routes from '../constants/routes/index';

// MOBX
import { inject, observer } from 'mobx-react';

class App extends Component {
  componentDidMount = async () => {
    const { checkUserAuth } = this.props.firebaseStore;

    await checkUserAuth();
  };

  render() {
    const { firebaseStore } = this.props;

    return (
      <Router>
        <Switch>
          <AdminRoute exact path={`${routes.ADMIN_PANEL_USERS}/page/:num`} isAuth={firebaseStore.isAuthenticated} isAdmin={firebaseStore.isAdmin} component={AdminPanel} />
          <AdminRoute exact path={routes.ADMIN_PANEL_GENERAL} isAuth={firebaseStore.isAuthenticated} isAdmin={firebaseStore.isAdmin} component={AdminPanel} />
          <PrivateRoute exact path={routes.DASHBOARD} isAuth={firebaseStore.isAuthenticated} component={Dashboard} />
          <PrivateRoute exact path={routes.SETTINGS} isAuth={firebaseStore.isAuthenticated} component={Settings} />
          <Route path={routes.LOGIN} render={(props) => firebaseStore.isAuthenticated ? <Redirect to={routes.DASHBOARD} /> : <LoginPanel {...props} />} />
          <Route path={routes.REGISTER} render={(props) => firebaseStore.isAuthenticated ? <Redirect to={routes.DASHBOARD} /> : <RegisterPanel {...props} />} />
          <Route render={() => <Redirect to={routes.DASHBOARD} />} />
        </Switch>
      </Router>
    )
  }
}

export default inject('firebaseStore')(observer(App));
