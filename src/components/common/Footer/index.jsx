import React from 'react';
import pckg from '../../../../package.json'

const Footer = () => (
  <div className="py-2 pl-3">
    <span className="small text-muted">App version: {pckg.version}</span>
  </div>
);

export default Footer;
