import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import {fetchAllQueues} from "../../actions/queue";
import Grid from "@material-ui/core/Grid";
import QueueTable from "./QueueTable";
import isEmpty from 'is-empty'

const styles = theme => ({
  palette: {
    type: 'dark'
  },
  contentWrapper: {
    marginTop: 20
  },
  paper: {
    // maxWidth: 936,
    marginTop: 40,
    marginBottom: 40,
    paddingBottom: 40,
    overflow: 'hidden',
  },
  table: {
    palette: {
      type: 'dark'
    },
    minWidth: 650,
  },
});

class DashboardHome extends React.Component {

  componentDidMount() {
    this.props.fetchAllQueues();
  }

  render() {

    // const {classes} = this.props;

    return (
      <Grid container justify="center" spacing={4} style={{marginTop: 20, marginBottom: 20}}>
        <Grid item>
          <Typography variant='h5' component='h6' color="textSecondary" align="center">
            Welcome to the dashboard homepage!
          </Typography>
        </Grid>
        {
          !isEmpty(this.props.queues) ? <QueueTable rows={this.props.queues}/> : <QueueTable rows={[]}/>
        }
      </Grid>
    );
  };
}

DashboardHome = withStyles(styles)(DashboardHome);

const mapStateToProps = (state) => {
  const {session, queueStore} = state;
  return {
    session,
    queues: queueStore.queues
  }
};

DashboardHome = connect(
  mapStateToProps, {
    fetchAllQueues
  }
)(DashboardHome);


export default DashboardHome;