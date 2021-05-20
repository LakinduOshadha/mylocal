import React, {Component} from 'react';
import * as d3 from 'd3';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import {getTranform} from '../model/LatLng.js';
import {latLngToXY, xyToLatLng, getMapURL} from '../model/OSM.js';
import './OSMView.css';
// import 'leaflet/dist/leaflet.css';

export default class OSMView extends Component {
  render() {
    const {zoom, bbox} = this.props;
    const [[minLat, minLng], [latSpan, lngSpan]] = bbox;

    const position = [minLat + latSpan / 2, minLng + lngSpan  / 2];
    return (
      <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    );
  }
}
