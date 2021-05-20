import React, {Component} from 'react';
import * as d3 from 'd3';

import {getTranform} from '../model/LatLng.js';
import {latLngToXY, xyToLatLng, getMapURL} from '../model/OSM.js';
import './OSMView.css';

export default class OSMView extends Component {
  render() {
    const {zoom, bbox, width, height} = this.props;
    const [[minLat, minLng], [latSpan, lngSpan]] = bbox;

    const [[minX, minY], [maxX, maxY]] = [
      latLngToXY([minLat + latSpan, minLng], zoom),
      latLngToXY([minLat, minLng + lngSpan], zoom),
    ]

    const [minXTrunc, minYTrunc, maxXTrunc, maxYTrunc] =
      [minX, minY, maxX + 1, maxY + 1].map(x => Math.trunc(x))
    const [xSpan, ySpan] = [maxX - minX, maxY - minY];


    const styleImage = {
      width: width / xSpan,
      height: height / ySpan,
    }

    const transform = getTranform(
      [width, height],
      [minLat, minLng],
      [latSpan, lngSpan],
    )
    const [left, top] = transform(xyToLatLng([minXTrunc, minYTrunc], zoom));
    const styleMap = {
      top,
      left,
    }

    return (
      <div className="div-osmview" style={styleMap}>
        {d3.range(minYTrunc, maxYTrunc).map(
          function(y) {
            return (
              <div key={`osm-row-${y}`} className="div-osmview-row">
                {d3.range(minXTrunc, maxXTrunc).map(
                  function(x) {

                    return (
                      <img
                        key={`osm-${x}-${y}`}
                        className="img-osm"
                        style={styleImage}
                        src={getMapURL([x, y], zoom)}
                        alt={''}
                        onClick={this.props.onClick}
                      />
                    )
                  }.bind(this)
                )}
              </div>
            )
          }.bind(this)
        )}
      </div>
    )
  }
}
