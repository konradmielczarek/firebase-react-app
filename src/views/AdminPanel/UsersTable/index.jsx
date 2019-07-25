import React, { Component } from 'react';
import * as moment from 'moment';

// REACTSTRAP
import { Table } from 'reactstrap';

// MOBX
import { inject, observer } from 'mobx-react';

//COMPONENTS
import Pagination from '../../../components/common/Pagination';

class UsersTable extends Component {
  render() {
    const { users } = this.props.firebaseStore;

    return (
      <>
        <Table size="sm" hover borderless striped>
          <thead className="border-bottom border-secondary">
            <tr>
              <th>Username</th>
              <th>Creation date</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.uid}>
                <td>{user.email}</td>
                <td>{moment(user.creationDate).format("DD.MM.YYYY") || 'N/A'}</td>
                <td>{user.isAdmin === true ? 'Admin' : 'User'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="mt-4">
          <Pagination />
        </div>
      </>
    )
  }
}

export default inject('firebaseStore')(observer(UsersTable));
