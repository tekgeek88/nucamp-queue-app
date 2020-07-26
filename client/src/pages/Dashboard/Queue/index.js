import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import isEmpty from "is-empty";
import QueueItemTable from "./QueueItemTable";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {fetchQueue} from "../../../actions/queue";
import {parseDateTime} from "../../../utils/utils";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";

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


class Queue extends React.Component {


  componentDidMount() {
    console.log("preparing to fetch the queue")
    this.props.fetchQueue(this.props.match.params.queueId);
  }


  render() {
    console.log('The Queue props');
    console.log(this.props);

    const {classes} = this.props;

    const renderQueueInfo = () => {
      return (
        <React.Fragment>
          <Grid item>
            <Typography variant='caption' color="textSecondary">
              QueueId: {this.props.match.params.queueId}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='caption' color="textSecondary">
              Created At: {parseDateTime(this.props.queue.createdAt)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='caption' color="textSecondary">
              Created By: {!isEmpty(this.props.queue.owner) ? this.props.queue.owner.email : null}
            </Typography>
          </Grid>
        </React.Fragment>
      );
    };

    const renderQueueTitle = () => {
      return (
        <React.Fragment>
          <Grid item>
            <Typography variant='h5' component='h6' color="textSecondary" align="center">
              {this.props.queue.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='h5' component='h6' color="textSecondary" align="center">
              {this.props.queue.description}
            </Typography>
          </Grid>
        </React.Fragment>

      );
    };

    return (
      <Grid container
            direction="column"
            justify="flex-start"
            alignItems="center"
            style={{marginTop: 16, marginBottom: 16}}>
        {!isEmpty(this.props.queue) ? renderQueueTitle() : null}
        <Grid container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
        >
          {!isEmpty(this.props.queue) ? renderQueueInfo() : null}
        </Grid>
        {
          !isEmpty(this.props.queue) ? !isEmpty(this.props.queue.items) ?
            <QueueItemTable rows={this.props.queue.items}/> : <QueueItemTable rows={[]}/> : null
        }
        <Fab color="primary" variant="outlined" aria-label="add" onClick={() => alert("Feature coming soon!")}>
          Join queue
        </Fab>
      </Grid>
    );
  }
}

Queue = withStyles(styles)(Queue);

const mapStateToProps = (state) => {
  console.log("Mapping state to props from single Queue view");
  console.log(state);
  const {session, queueStore} = state;

  return {
    session,
    queue: queueStore.queue
  }
};

Queue = connect(
  mapStateToProps, {
    fetchQueue
  }
)(Queue);


export default Queue;