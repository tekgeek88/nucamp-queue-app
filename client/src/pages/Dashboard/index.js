import React from 'react';
import {connect} from "react-redux";
import {Switch} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';

import {ProtectedAdminRoute, ProtectedRoute} from "../../utils/route";
import DashboardHome from "./DashboardHome";
import Queue from "./Queue";

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  }
});

let Dashboard = (props) => {
  const {classes} = props;
  console.log("Props from the dashboard");
  console.log(props);
  return (
    <Switch>
      <ProtectedRoute exact path="/dashboard" component={DashboardHome}/>
      <ProtectedRoute path="/dashboard/queue" component={Queue}/>
    </Switch>
  );
};

const mapStateToProps = (state) => {
  console.log("Mapping state to props from dashboard");
  console.log(state);
  const {session, queue} = state;
  return {
    session, queue
  }
};

Dashboard = withStyles(styles)(Dashboard);

Dashboard = connect(
  mapStateToProps, {

  }
)(Dashboard);

export default Dashboard;