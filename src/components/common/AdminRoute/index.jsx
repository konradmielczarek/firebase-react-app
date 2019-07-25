import React from 'react';

// REACT-ROUTER
import { Route, Redirect } from 'react-router-dom';

import * as routes from '../../../constants/routes';
import BasicLayout from '../../layouts/BasicLayout';

const AdminRoute = ({ component: Component, isAuth, isAdmin, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuth && isAdmin ? (
        <BasicLayout adminPanel>
          <Component {...props} />
        </BasicLayout>
      ) : (
          <Redirect
            to={{
              pathname: routes.DASHBOARD,
              state: { from: props.location }
            }}
          />
        )
    }
  />
)

export default AdminRoute;
