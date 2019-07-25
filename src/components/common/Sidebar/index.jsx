// import React, { Component } from 'react';

// // ROUTER
// import { withRouter } from 'react-router';
// import { Link } from 'react-router-dom';

// // REACTSTRAP
// import {
//   Col,
//   Nav,
//   NavItem,
//   NavLink,
//   Row,
// } from 'reactstrap';

// // ROUTES
// import * as routes from '../../../constants/routes';

// // MOBX
// import { inject, observer } from 'mobx-react';

// class SideBar extends Component {

//   render() {
//     return (
//       <Row>
//         <Nav className="col-md-2 d-none d-md-block bg-light sidebar">
//           <div className="sidebar-sticky">
//             <ul className="nav flex-column">
//               <NavItem>
//                 <Link to={routes.DASHBOARD} className="nav-link">
//                   Dashboard
//                 </Link>
//               </NavItem>
//               <NavItem>
//                 <Link to={routes.DASHBOARD} className="nav-link">
//                   Dashboard
//                 </Link>
//               </NavItem>
//               <NavItem>
//                 <Link to={routes.DASHBOARD} className="nav-link">
//                   Dashboard
//                 </Link>
//               </NavItem>
//               <NavItem>
//                 <Link to={routes.DASHBOARD} className="nav-link">
//                   Dashboard
//                 </Link>
//               </NavItem>
//             </ul>
//           </div>
//         </Nav>
//       </Row>
//     );
//   }
// }

// export default withRouter(inject('firebaseStore')(observer(SideBar)));
