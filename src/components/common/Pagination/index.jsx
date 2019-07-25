import React from 'react';

//REACTSTRAP
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

//ROUTER
import { withRouter, Link } from 'react-router-dom';

//MOBX
import {inject, observer} from "mobx-react";

//ROUTES
import * as routes from '../../../constants/routes/index';

const CustomPagination = ({ firebaseStore, match, match: { params: { num } } }) => {
  if (firebaseStore.usersTotal <= firebaseStore.usersLimit) return null;

  const currentPage = parseInt(num);
  const pagesNumber = Math.ceil(firebaseStore.usersTotal / firebaseStore.usersLimit);
  const pages = [];

  for (let i = 0; i < pagesNumber;  i++) {
    pages.push(i + 1);
  }

  const renderPages = () => {
    return pages.map(page => {
      return (
        <PaginationItem key={page} active={page === currentPage}>
          <PaginationLink tag={Link} to={`${routes.ADMIN_PANEL_USERS}/page/${page}`}>
            { page }
          </PaginationLink>
        </PaginationItem>
      )
    })
  };

  return (
    <Pagination size="sm">
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink previous tag={Link} to={`${routes.ADMIN_PANEL_USERS}/page/${currentPage - 1}`} />
      </PaginationItem>
      {renderPages()}
      <PaginationItem disabled={currentPage === pagesNumber}>
        <PaginationLink next tag={Link} to={`${routes.ADMIN_PANEL_USERS}/page/${currentPage + 1}`} />
      </PaginationItem>
    </Pagination>
  );
}

export default withRouter(inject('firebaseStore')(observer(CustomPagination)));