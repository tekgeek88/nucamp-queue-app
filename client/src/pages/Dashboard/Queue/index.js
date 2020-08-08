import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import isEmpty from "is-empty";
import QueueItemTable from "./QueueItemTable";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {createQueueItem, fetchQueue} from "../../../actions/queue";
import {parseDateTime} from "../../../utils/utils";
import Button from "@material-ui/core/Button";

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
  state = {isOpen: false};

  handleClickOpen = () => {
    this.setState({isOpen: true});
  };

  handleClose = () => {
    this.setState({isOpen: false});
  };

  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.createQueueItem(formValues);
    this.handleClose()
  };

  componentDidMount() {
    this.props.fetchQueue(this.props.match.params.queueId);
  }


  render() {

    // const {classes} = this.props;

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
            style={{marginTop: 16, marginBottom: 16}}
      >
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
            <React.Fragment>
              <QueueItemTable rows={this.props.queue.items}/>
            </React.Fragment>
            : <React.Fragment>
              <QueueItemTable rows={[]}/>
              <Button color="primary" variant="outlined" aria-label="add" onClick={() => this.props.createQueueItem(this.props.match.params.queueId)}>
                Join queue
              </Button>
            </React.Fragment>
            : null
        }
      </Grid>
    );
  }
}

Queue = withStyles(styles)(Queue);

const mapStateToProps = (state) => {
  const {session, queueStore} = state;

  return {
    session,
    queue: queueStore.queue
  }
};

Queue = connect(
  mapStateToProps, {
    fetchQueue,
    createQueueItem
  }
)(Queue);


export default Queue;