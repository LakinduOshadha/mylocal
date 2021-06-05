import React, {Component} from 'react';
import {arrayFlatten} from 'base/DataStructures.js';
import GeoServer from 'core/GeoServer.js';
import {Polyline} from 'react-leaflet';

import './RegionMap.css';

export default class RegionMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geoDataForRegion: undefined,
    };
  }

  async componentDidMount() {
    const {regionID} = this.props;
    this.setState({
      geo: await GeoServer.getGeo(regionID),
    })
  }

  render() {
    const {geo} = this.state;
    if (!geo) {
      return null;
    }

    let multiPolygon;
    if (geo.type === 'Polygon') {
      multiPolygon = geo.coordinates;
    } else {
      multiPolygon = arrayFlatten(geo.coordinates);
    }

    multiPolygon = multiPolygon.map(
      (polygon) => polygon.map(
        ([lng, lat]) => [lat, lng],
      )
    );

    return (
      <Polyline
        positions={multiPolygon}
        pathOptions={{
          color: 'red',
          weight: 2,
          fill: 'red',
          fillOpacity: 0.1,
        }}
      />
    )
  }
}
