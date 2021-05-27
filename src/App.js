import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {DEFAULT_ENTITY_ID} from 'model/EntityConstants.js';

import AdminPage from 'view/pages/AdminPage.js';
import PlacePage from 'view/pages/PlacePage.js';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router basename="/mylocal">
          <Switch>
            <Route path="/admin/:regionID" component={AdminPage}/>
            <Route path="/place/:entityID" component={PlacePage}/>
            <Route>
               <Redirect to={`/admin/${DEFAULT_ENTITY_ID}`} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
