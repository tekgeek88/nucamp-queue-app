import React from 'react';
import {connect} from "react-redux";
import {Switch} from "react-router-dom";
import {ProtectedRoute} from "../../utils/route";
import {withStyles} from '@material-ui/core/styles';
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
      <ProtectedRoute exact path="/dashboard/queue/:queueId" component={Queue}/>
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