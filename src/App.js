import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {DEFAULT_ENTITY_ID} from './model/Entity.js';

import LocationPageView from './pages/LocationPageView.js';
import AdminPageView from './pages/AdminPageView.js';
import PlacePageView from './pages/PlacePageView.js';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router basename="/mylocal">
          <Switch>

            <Route path="/admin/:regionID" component={AdminPageView}/>
            <Route path="/location/:latLngStr" component={LocationPageView}/>
            <Route
              path="/place/:entityID"
              component={PlacePageView}
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
