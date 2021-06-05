import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import {MapContainer, TileLayer} from 'react-leaflet';

import {ENTITY} from 'constants/EntityConstants.js';
import {LAT_LNG} from 'constants/LatLngConstants.js';
import GeoServer from 'core/GeoServer.js';

import MapLocationMarker from 'stateful/atoms/MapLocationMarker.js';

import './Page.css';

export const DEFAULT_ZOOM = 16;

export function redirectToErrorPage() {
  window.location.href = "/mylocal/error";
}

export default class Page extends Component {

  constructor(props) {
    super(props);
    this.onChangeLocation = this.onChangeLocation.bind(this);
  }

  async getLatLngAndZoom() {
    return {latLng: LAT_LNG.COLOMBO, zoom: DEFAULT_ZOOM};
  }

  async componentDidMount() {
    const {latLng, zoom} = await this.getLatLngAndZoom();
    this.setState({latLng, zoom});
  }

  async onChangeLocation([lat, lng]) {
    const region = await GeoServer.getRegionInfo([lat, lng]);
    const gndID = region[ENTITY.GND];
    if (gndID) {
      window.location.href = `/mylocal/admin/${gndID}`;
    }
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
