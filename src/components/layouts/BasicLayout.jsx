import React from 'react';

// REACTSTRAP
import { Container } from 'reactstrap';

// COMPONENTS
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';

const BasicLayout = ({ children, adminPanel }) => {
  return (
    <>
      <div className="wrapper">
        <NavBar />
        <Container className="py-5">
          {children}
        </Container>
      </div>
      <Footer />
    </>
  )
};

export default BasicLayout;

// ${adminPanel ? 'container-fluid' : 'container'}