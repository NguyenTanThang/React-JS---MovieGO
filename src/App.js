import React from "react";
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Navbar from "./components/partials/Navbar";
import Footer from "./components/partials/Footer";

import Home from "./pages/Home";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import Images from "./pages/Images";
import Browse from "./pages/Browse";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route exact component={Home} path="/"/>
          <Route component={SignIn} path="/sign-in"/>
          <Route component={Browse} path="/browse"/>
          <Route component={Search} path="/search"/>
          <Route component={SignUp} path="/sign-up"/>
          <Route component={Images} path="/images"/>
          <Route component={MovieDetails} path="/movie-details/:movieID"/>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
