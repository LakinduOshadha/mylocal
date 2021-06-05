import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {DEFAULT_ENTITY_ID} from 'core/EntityConstants.js';

import AdminPage from 'stateful/pages/AdminPage.js';
import ErrorPage from 'stateful/pages/ErrorPage.js';
import PlacePage from 'stateful/pages/PlacePage.js';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router basename="/mylocal">
          <Switch>
            <Route path="/admin/:regionID" component={AdminPage}/>
            <Route path="/place/:entityID" component={PlacePage}/>
            <Route path="/error" component={ErrorPage}/>
            <Route>
               <Redirect to={`/admin/${DEFAULT_ENTITY_ID}`} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
