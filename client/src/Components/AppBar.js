import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import history from "../history";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {logout} from "../actions/session";
import {connect} from "react-redux";
import {makeStyles} from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  jumbotron: {
    padding: '20',
    background: 'linear-gradient(to right, #065464, #212121, #065464)',
    color: 'white'
  },
  link: {
    textDecoration: 'none',
    color: "grey",
    '&:hover': {
      color: 'white'
    }
  }
}));

const CustomAppBar = (props) => {
  const classes = useStyles();
  return (
    <AppBar className={classes.jumbotron} position="static">
      <Toolbar>
        <Typography align={"center"} variant="h6" className={classes.title}>
          Queue App
        </Typography>
      </Toolbar>
      <Toolbar>
        <Grid container
              direction="row"
              justify="center"
              alignItems="center"
              style={{flexGrow: 1, backgroundColor: 'black'}}
              spacing={4}
        >
          <Grid item>
            <Typography
              onClick={() => history.push(`/`)}
              variant="button"
              className={classes.link}>
              Home
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              onClick={() => history.push(`/products`)}
              variant="button"
              className={classes.link}>
              Products
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              onClick={() => history.push(`/aboutus`)}
              variant="button"
              className={classes.link}>
              About Us
            </Typography>
          </Grid>
          <Grid item>
            {props.isLoggedIn ?
              <Typography
                onClick={() => props.logout()}
                variant="button"
                className={classes.link}>Logoff
              </Typography>
              :
              <Typography
                onClick={() => history.push(`/login`)}
                variant="button"
                className={classes.link}>Login
              </Typography>}
          </Grid>
        </Grid>


      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  const {session: {userId}} = state;
  return ({
    isLoggedIn: Boolean(userId),
  });
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomAppBar);