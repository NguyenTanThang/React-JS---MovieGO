import React from "react";
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Navbar from "./components/partials/Navbar";
import Footer from "./components/partials/Footer";
import PrivateRoute from "./components/partials/PrivateRoute";

import Home from "./pages/Home";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import WatchLater from "./pages/WatchLater";
import Images from "./pages/Images";
import Browse from "./pages/Browse";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";

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
          <Route component={WatchLater} path="/watch-later"/>
          <Route path="/movie-details/:movieID" render={props => <MovieDetails key={props.match.params.movieID} {...props} />}/>
          {/*<PrivateRoute path="/watch-later" component={WatchLater}/>*/}
          <PrivateRoute path="/profile" component={Profile}/>
          <PrivateRoute component={Logout} path="/logout"/>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
