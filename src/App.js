import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {DEFAULT_ENTITY_ID} from 'model/Entity.js';

import LocationPage from 'view/pages/LocationPage.js';
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
            <Route path="/location/:latLngStr" component={LocationPage}/>
            <Route
              path="/place/:entityID"
              component={PlacePage}
            />
            <Route>
               <Redirect to={`/admin/${DEFAULT_ENTITY_ID}`} />
            </Route>

          </Switch>
        </Router>
      </div>
    );
  }
}
