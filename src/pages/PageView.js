import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import {getBrowserLatLng} from '../model/Browser.js';
import {roundLatLng, latLngAndZoomToString} from '../model/LatLng.js';
import {LAT_LNG} from '../model/LatLngConstants.js';
import {getLatLngSpans} from '../model/OSM.js';

import LocationIcon from '../components/LocationIcon.js';
import OSMView from '../components/OSMView.js';
import ZoomerView from '../components/ZoomerView.js';

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

  render() {
    if (!this.state || !this.state.latLng) {
      return 'Loading...';
    }
    const {zoom, latLng} = this.state;

    const [width, height] = [window.innerWidth, window.innerHeight];
    const updateZoom = function(dZoom) {
      const newZoom = this.state.zoom + dZoom;
      this.setState({zoom: newZoom});
    }.bind(this);

    const onClickZoomIn = function(e) {
      updateZoom(1)
    }

    const onClickZoomOut = function(e) {
      updateZoom(-1)
    }

    const onClickZoomLocation = function(e) {
      getBrowserLatLng(
        function(latLng) {
          this.setState({latLng, zoom: DEFAULT_ZOOM});
        }.bind(this)
      )
    }.bind(this)

    const [latSpan, lngSpan] = getLatLngSpans([width, height], zoom);
    const [lat, lng] = latLng;
    const [minLat, minLng] = [lat - latSpan / 2, lng - lngSpan / 2];

    const key = `page-${lat}-${lng}-${zoom}`;
    return (
      <div key={key}>
        <OSMView
          width={width}
          height={height}
          bbox={[[minLat, minLng], [latSpan, lngSpan]]}
          zoom={zoom}
          onClick={this.onClick.bind(this)}
        />
        <ZoomerView
          onClickZoomIn={onClickZoomIn}
          onClickZoomOut={onClickZoomOut}
          disableZoomIn={zoom > 18}
          disableZoomOut={zoom < 8}
          onClickZoomLocation={onClickZoomLocation}
        />
        <LocationIcon width={width} height={height} />
        {this.renderInner()}
      </div>
    )
  }
}
withRouter(PageView);
