import React, { Component } from 'react';

// MOBX
import { inject, observer } from 'mobx-react';

// import * as routes from '../../constants/routes';

class Users extends Component {
  componentDidMount = async () => {
    await this.props.firebaseStore.getUsers();
  }

  render() {
    const { users, isLoading } = this.props.firebaseStore;

    return (
      <>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {users.map(user => (
              <li key={user.uid}>
                {user.email}, {user.uid}
              </li>
            ))}
          </ul>
        )}
      </>
    )
  }
}

export default inject('firebaseStore')(observer(Users));
