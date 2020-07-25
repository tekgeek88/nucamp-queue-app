import React from "react";
import {Route} from "react-router-dom";
import Homepage from "./pages/HomePage"
import {AuthRoute, ProtectedRoute} from "./utils/route";
import Login from "./pages/Login";
import Products from "./pages/Products"
import AboutUs from "./pages/AboutUs"
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import {ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import Container from "@material-ui/core/Container";
import CustomAppBar from "./Components/AppBar";

const App = (props) => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <CustomAppBar />
      <Container>
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/products" component={Products}/>
        <Route exact path="/aboutus" component={AboutUs}/>
        <AuthRoute exact path="/login" component={Login}/>
        <AuthRoute exact path="/signup" component={Signup}/>
        <ProtectedRoute path="/dashboard" component={Dashboard}/>
      </Container>
    </ThemeProvider>
  );
};

export default App;