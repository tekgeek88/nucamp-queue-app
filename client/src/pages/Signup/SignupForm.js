import React from "react";
import {connect} from "react-redux";
import {Field, reduxForm, SubmissionError} from 'redux-form'
import {signup} from "../../actions/session";
import TextField from "@material-ui/core/TextField";
import {withStyles} from '@material-ui/core/styles';
import _ from 'lodash'
import Grid from "@material-ui/core/Grid";
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

const styles = {
  link: {
    textDecoration: 'none',
    color: "white",
    '&:hover': {
      color: 'white'
    }
  }
};


const renderFromHelper = (touched, error) => !(touched && error) ? null : touched && error;

const validate = values => {
  const errors = {};
  const requiredFields = [
    'firstname',
    'lastname',
    'email',
    'password',
    'password2'
  ];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });

  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
};

class SignupForm extends React.Component {

  renderTextField = ({
                       input, label,
                       meta: {touched, invalid, error},
                       ...custom
                     }) => (
    <TextField
      style={{marginTop: '16px'}}
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={renderFromHelper(touched, error, this.props)}
      variant="outlined"
      margine="normal"
      fullWidth
      {...input}
      {...custom}
    />
  );

  onSubmit = (formValues) => {
    return this.props.signup(formValues).then(() => {
      const {errors, message} = this.props.error;
      if (!_.isEmpty(errors)) {
        errors.forEach(error => {
          const myKeys = Object.keys(error);
          const key = myKeys[0];
          const value = error[key];
          if (key === 'firstname') {
            throw new SubmissionError({firstname: value, _error: message})
          }
          if (key === 'lastname') {
            throw new SubmissionError({lastname: value, _error: message})
          }
          if (key === 'email') {
            throw new SubmissionError({email: value, _error: message})
          }
          if (key === 'password') {
            throw new SubmissionError({password: value, _error: message})
          }if (key === 'password2') {
            throw new SubmissionError({password2: value, _error: message})
          }
        });
      }
    });
  };

  render() {
    const {classes, handleSubmit} = this.props;
    return (
      <Grid>
        <Grid item>
          <Typography>
            Signup Form
          </Typography>
        </Grid>
        <form
          className={classes.form} noValidate onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="firstname"
            component={this.renderTextField}
            label="First Name"
            type="text"
          />
          <Field
            name="lastname"
            component={this.renderTextField}
            label="Last Name"
            type="text"
          />
          <Field
            name="email"
            component={this.renderTextField}
            label="Email"
            type="email"
          />
          <Field
            name="password"
            component={this.renderTextField}
            type="password"
            label="Password"
          />
          <Field
            name="password2"
            component={this.renderTextField}
            type="password"
            label="Confirm Password"
          />

            <Button style={{marginTop: 20}}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          <Grid container style={{padding: 20}} alignItems="center">
            <Grid item xs>
              <Link component={RouterLink} to="/forgotPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item xs>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    );
  };
}

const mapStateToProps = (state) => {
  return ({
    error: state.error
  });
};

const mapDispatchToProps = dispatch => ({
  signup: user => dispatch(signup(user))
});

SignupForm = withStyles(styles)(SignupForm);

SignupForm = connect(
  mapStateToProps,
  mapDispatchToProps)(SignupForm);

export default reduxForm({
  form: 'signupForm',
  validate
})(SignupForm)