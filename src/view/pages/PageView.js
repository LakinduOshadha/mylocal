import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import {MapContainer, TileLayer} from 'react-leaflet';

import {LAT_LNG} from 'model/LatLngConstants.js';
import MapLocationMarker from '../components/MapLocationMarker.js';

import './PageView.css';

export const DEFAULT_ZOOM = 16;

export default class PageView extends Component {
  async getLatLngAndZoom() {
    return {latLng: LAT_LNG.COLOMBO, zoom: DEFAULT_ZOOM};
  }

  async componentDidMount() {
    const {latLng, zoom} = await this.getLatLngAndZoom();
    this.setState({latLng, zoom});
  }

  renderInner() {
    return null;
  }

  renderInnerMapLayer() {
    return null;
  }

  render() {
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
          <MapLocationMarker />
        </MapContainer>
        {this.renderInner()}
      </div>
    )
  }
}

withRouter(PageView);
