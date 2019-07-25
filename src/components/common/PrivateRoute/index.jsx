import React from 'react';

// REACT-ROUTER
import { Route, Redirect } from 'react-router-dom';

import * as routes from '../../../constants/routes';
import BasicLayout from '../../layouts/BasicLayout';

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuth ? (
        <BasicLayout>
          <Component {...props} />
        </BasicLayout>
      ) : (
          <Redirect
            to={{
              pathname: routes.LOGIN,
              state: { from: props.location }
            }}
          />
        )
    }
  />
)

export default PrivateRoute;
