import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import {fetchAllQueues} from "../../actions/queue";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

class DashboardHome extends React.Component {


  componentDidMount() {
    // Fetch the queues available
    this.props.fetchAllQueues();
    // this.props.getConnectionsForUser(this.props.session.userId);
  }

  render() {
    const {classes} = this.props;
    return (
      <Paper className={classes.paper}>
        <div className={classes.contentWrapper}>
          <Grid container justify="center">
            <Grid item>
              <Typography variant='h5' component='h6' color="textSecondary" align="center">
                Welcome to the dashboard homepage!
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Paper>
    );
  };
}

DashboardHome = withStyles(styles)(DashboardHome);

const mapStatetoProps = (state) => {
  return {
    ...state
  }
};

DashboardHome = connect(
  mapStatetoProps, {
    fetchAllQueues
  }
)(DashboardHome);


export default DashboardHome;