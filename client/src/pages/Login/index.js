import React from 'react';
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LoginForm from './LoginForm'

const renderFromHelper = (touched, error) => !(touched && error) ? null : touched && error;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Login = props => {
  const classes = useStyles();
  return (

    <div className={classes.root}>
      <Grid
        container spacing={3}
        direction="column"
        justify="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Paper>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <LoginForm />
            </Paper>
          </Grid>
        </Paper>
      </Grid>
    </div>
  )
};

export default Login;