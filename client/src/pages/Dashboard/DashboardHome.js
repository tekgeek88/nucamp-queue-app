import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import {fetchAllQueues} from "../../actions/queue";
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function parseDateTime(dateTime) {
  return new Date(dateTime).toLocaleString('en-US');
}

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

function createData(queuedId, name, description, items, owner, ownerEmail, createdAt) {
  return {queuedId, name, description, items, owner, ownerEmail, createdAt};
}

class DashboardHome extends React.Component {


  componentDidMount() {
    // Fetch the queues available
    this.props.fetchAllQueues();
    // this.props.getConnectionsForUser(this.props.session.userId);
  }

  render() {
    const {classes} = this.props;
    console.log("Props from DashboardHome:");
    console.log(this.props);
    return (
        <Grid container justify="center" spacing={4} style={{marginTop: 20, marginBottom: 20}}>
          <Grid item>
            <Typography variant='h5' component='h6' color="textSecondary" align="center">
              Welcome to the dashboard homepage!
            </Typography>
          </Grid>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="center">Items</TableCell>
                  <TableCell align="left">Owner</TableCell>
                  <TableCell align="left">Owner Email</TableCell>
                  <TableCell align="left">Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.queues ? this.props.queues.map(queue => {
                  const row = createData(
                    queue._id,
                    queue.name,
                    queue.description,
                    queue.items.length,
                    `${queue.owner.firstname} ${queue.owner.lastname}`,
                    queue.owner.email,
                    queue.createdAt
                  );
                  return (
                    <TableRow key={row.queuedId}>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="center">{row.items}</TableCell>
                      <TableCell align="left">{row.owner}</TableCell>
                      <TableCell align="left">{row.ownerEmail}</TableCell>
                      <TableCell align="left">{parseDateTime(row.createdAt)}</TableCell>
                    </TableRow>)
                }) : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
    );
  };
}

DashboardHome = withStyles(styles)(DashboardHome);

const mapStateToProps = (state) => {
  console.log("Mapping state to props from dashboard");
  console.log(state);
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