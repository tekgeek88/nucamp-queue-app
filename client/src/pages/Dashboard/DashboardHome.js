import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import {createQueue, fetchAllQueues} from "../../actions/queue";
import Grid from "@material-ui/core/Grid";
import QueueTable from "./QueueTable";
import isEmpty from 'is-empty'
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {Field, reduxForm} from "redux-form";

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

const renderTextField = ({
                           input, label,
                           meta: {touched, invalid, error},
                           ...custom
                         }) => (
  <TextField
    style={{marginTop: '1px'}}
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && invalid && error}
    margin="dense"
    fullWidth

    {...input}
    {...custom}
  />
);

class DashboardHome extends React.Component {
  state = {isOpen: false};

  handleClickOpen = () => {
    this.setState({isOpen: true});
  };

  handleClose = () => {
    this.setState({isOpen: false});
  };

  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.createQueue(formValues);
    this.handleClose()
  };

  componentDidMount() {
    this.props.fetchAllQueues();
  }

  render() {

    // const {classes} = this.props;
    const {queues} = this.props;

    return (
      <Grid container justify="center" spacing={4} style={{marginTop: 20, marginBottom: 20}}>
        <Grid item>
          <Typography variant='h5' component='h6' color="textSecondary" align="center">
            Welcome to the dashboard homepage!
          </Typography>
        </Grid>
        {
          !isEmpty(queues) ? <QueueTable rows={queues}/> : <QueueTable rows={[]}/>
        }
        {
          <Button color="primary" variant="outlined" aria-label="add" onClick={this.handleClickOpen}>
            Create queue
          </Button>
        }
        <Dialog open={this.state.isOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create Queue</DialogTitle>
          <form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            <DialogContent>
              <DialogContentText>
                Give your queue a name and description to allow people to queue up at your location.
              </DialogContentText>
              <Field
                id="name"
                name="name"
                label="Queue name"
                component={renderTextField}
                required
              />
              <Field
                id="description"
                name="description"
                label="Queue description"
                component={renderTextField}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
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
    fetchAllQueues,
    createQueue
  }
)(DashboardHome);

DashboardHome = reduxForm({
  form: 'createQueueForm' // a unique identifier for this form
})(DashboardHome);

export default DashboardHome;