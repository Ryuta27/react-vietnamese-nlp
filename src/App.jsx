import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Analyze from "./components/Analyze";
import AddAccent from "./components/AddAccent";

const App = () => {
  return (
    <div className="App font-sans">
      <Header />
      {/* React routerで表示を切り替える */}
      <div className="min-h-screen bg-gray-100">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/analyze" component={Analyze} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />
          <Route path="/add-accent" component={AddAccent} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
