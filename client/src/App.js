import './App.css';
import React from "react";
import {Route} from "react-router-dom";
import Homepage from "./pages/HomePage"
// import {AuthRoute, ProtectedRoute} from "./utils/route";
// import Login from "./pages/Login/Login";
// import Signup from "./pages/Signup/Signup";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

export default () => (
  <>
    <Route exact path="/" component={Homepage}/>
    {/*<Route exact path="/forgotPassword" component={ForgotPassword}/>*/}
    {/*<AuthRoute exact path="/login" component={Login}/>*/}
    {/*<AuthRoute exact path="/signup" component={Signup}/>*/}
    {/*<ProtectedRoute path="/dashboard" component={Dashboard}/>*/}
  </>
);
