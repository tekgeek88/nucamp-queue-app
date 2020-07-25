import React from "react";
import {connect} from "react-redux";
import {Redirect, Route, withRouter} from "react-router-dom";

const Auth = ({loggedIn, path, component: Component}) => {
  return (
    <Route
      path={path}
      render={props => (
        loggedIn ?
          <Redirect to='/dashboard'/> :
          <Component {...props} />
      )}
    />
  );
};

const Protected = (props) => {
  console.log("Protected route props:");
  console.log(props);
  const {loggedIn, path, component: Component} = props;
  return (
    <Route
      path={path}
      render={props => (
        loggedIn ?
          <Component {...props} /> :
          <Redirect to='/login'/>
      )}
    />
  );
};

const ProtectedAdmin = (props) => {
  const {loggedIn, isAdmin, path, component: Component} = props;
  // console.log("Fucking protected admin bitches:");
  // console.log(props);
  return (
    <Route
      path={path}
      render={props => (
        loggedIn && isAdmin ?
          <Component {...props} /> :
          <Redirect to='/dashboard'/>
      )}
    />
  );
};

const mapStateToProps = (state) => {
  const {session: {userId, role}} = state;
  console.log("mappingStateToProps");
  console.log(state);
  return ({
    loggedIn: Boolean(userId),
    isAdmin: Boolean("admin" === role)
  });
};

export const AuthRoute = withRouter(
  connect(mapStateToProps)(Auth)
);

export const ProtectedRoute = withRouter(
  connect(mapStateToProps)(Protected)
);

export const ProtectedAdminRoute = withRouter(
  connect(mapStateToProps)(ProtectedAdmin)
);