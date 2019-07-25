import React from 'react';

// REACTSTRAP
import { Button } from 'reactstrap';

const LoadingButton = ({isLoading, children, ...props}) => (
  <Button {...props}>
    {isLoading && <i className="fas fa-circle-notch fa-spin mr-2"></i>}
    {children}
  </Button>
);

export default LoadingButton;
