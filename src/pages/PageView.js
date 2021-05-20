import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import { MapContainer, TileLayer, SVGOverlay } from 'react-leaflet';

import {roundLatLng, latLngAndZoomToString} from '../model/LatLng.js';
import {LAT_LNG} from '../model/LatLngConstants.js';
import {getLatLngSpans} from '../model/OSM.js';

import './PageView.css';

export const DEFAULT_ZOOM = 16;

export default class PageView extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
  }
  async getLatLngAndZoom() {
    return {latLng: LAT_LNG.COLOMBO, zoom: DEFAULT_ZOOM};
  }

  onClick(e) {
    const {latLng, zoom} = this.state;
    const [width, height] = [window.innerWidth, window.innerHeight];
    const [latSpan, lngSpan] = getLatLngSpans([width, height], zoom);

    const [startX, startY] = [width / 2, height / 2];
    const [dx, dy] = [startX - e.clientX, startY - e.clientY];

    const [lat, lng] = latLng;
    const [newLat, newLng] = roundLatLng([
      lat + latSpan * dy / height,
      lng - lngSpan * dx / width,
    ]);
    this.setState({latLng: [newLat, newLng]})
    this.props.history.push(
      `/location/${latLngAndZoomToString([newLat, newLng], zoom)}`
    );
  }

  async componentDidMount() {
    const {latLng, zoom} = await this.getLatLngAndZoom();
    this.setState({latLng, zoom});
  }

  renderInner() {
    return null;
  }

  renderInnerSVG() {
    return null;
  }

  render() {
    if (!this.state || !this.state.latLng) {
      return 'Loading...';
    }
    const {zoom, latLng} = this.state;

    const [width, height] = [window.innerWidth, window.innerHeight];
    const [latSpan, lngSpan] = getLatLngSpans([width, height], zoom);
    const [lat, lng] = latLng;
    const [minLat, minLng] = [lat - latSpan / 2, lng - lngSpan / 2];

    const bounds = [
        [minLat, minLng],
        [minLat + latSpan, minLng + lngSpan],
    ];

    const key = `page-${lat}-${lng}-${zoom}`;
    return (
      <div key={key}>
      <MapContainer center={[lat, lng]} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
      {this.renderInner()}
      </div>
    )
  }
}
withRouter(PageView);

// <SVGOverlay bounds={bounds}>
//   {this.renderInnerSVG()}
// </SVGOverlay>
