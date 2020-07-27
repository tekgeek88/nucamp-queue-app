import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import {fetchAllQueues} from "../../actions/queue";
import Grid from "@material-ui/core/Grid";
import QueueTable from "./QueueTable";
import isEmpty from 'is-empty'
import Button from "@material-ui/core/Button";
import SimpleModal from "../../Components/SimpleModal";

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

  state = {
    isOpen: false,
  };

  toggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen})
  };

  componentDidMount() {
    this.props.fetchAllQueues();
  }

  renderModalContent() {
    return `Create a queueu`
  }

  renderModalActions() {
    return (
      <Grid container alignItems="center" justify="center" spacing={4} style={{ marginTop: "16px"}}>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
          >
            Delete
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            // component={RouterLink}
            to="/dashboard"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    );
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
        {
          !isEmpty(this.props.queues) ?
            <Button color="primary" variant="outlined" aria-label="add" onClick={this.toggleOpen} >
            Create queue
          </Button> : null
        }
        <SimpleModal
          title="Create a queue"
          content={this.renderModalContent()}
          actions={this.renderModalActions()}
          open={this.state.isOpen}
        />
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