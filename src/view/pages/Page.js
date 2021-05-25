import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import {MapContainer, TileLayer} from 'react-leaflet';

import {LAT_LNG} from 'model/LatLngConstants.js';
import MapLocationMarker from '../components/MapLocationMarker.js';

import './Page.css';

export const DEFAULT_ZOOM = 16;

export default class Page extends Component {
  async getLatLngAndZoom() {
    return {latLng: LAT_LNG.COLOMBO, zoom: DEFAULT_ZOOM};
  }

  async componentDidMount() {
    console.debug('componentDidMount', this.state, this.props);
    const {latLng, zoom} = await this.getLatLngAndZoom();
    this.setState({latLng, zoom});
  }



  async onChangeLocation([lat, lng]) {
    return null;
  }


  renderInner() {
    return null;
  }

  renderInnerMapLayer() {
    return null;
  }

  render() {
    console.debug(this.state);
    if (!this?.state?.latLng) {
      return 'Loading...';
    }
    const {zoom, latLng} = this.state;
    const [lat, lng] = latLng;

    return (
      <div key={`page-${lat}-${lng}-${zoom}`}>
        <MapContainer center={[lat, lng]} zoom={zoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {this.renderInnerMapLayer()}
          <MapLocationMarker
            onChangeLocation={this.onChangeLocation}
          />
        </MapContainer>
        {this.renderInner()}
      </div>
    )
  }
}

withRouter(Page);
