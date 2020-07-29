import React from 'react';
import {connect} from "react-redux";
import {Switch} from "react-router-dom";
import {ProtectedRoute} from "../../utils/routeHOC";
import {withStyles} from '@material-ui/core/styles';
import DashboardHome from "./DashboardHome";
import Queue from "./Queue";
import FormDialog from "./FormDialog";

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  }
});

let Dashboard = (props) => {
  return (
    <Switch>
      <ProtectedRoute exact path="/dashboard" component={DashboardHome}/>
      <ProtectedRoute exact path="/dashboard/queue/:queueId" component={Queue}/>
      <ProtectedRoute exact path="/dashboard/dialog" component={FormDialog()}/>
    </Switch>
  );
};

const mapStateToProps = (state) => {
  const {session} = state;
  return {
    session
  }
};

Dashboard = withStyles(styles)(Dashboard);

Dashboard = connect(
  mapStateToProps, {

  }
)(Dashboard);

export default Dashboard;