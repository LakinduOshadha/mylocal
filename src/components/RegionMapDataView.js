import {Component} from 'react';
import {arrayFlatten} from '../model/DataStructures.js';
import {getTranform} from '../model/LatLng.js';
import GeoServer from '../model/GeoServer.js';
import './RegionMapDataView.css';

const [LAT_CORRECTION, LNG_CORRECTION] = [0.0004, 0.0021];

export default class RegionMapDataView extends Component {
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
    const {width, height, bbox} = this.props;
    const [[minLat, minLng], [latSpan, lngSpan]] = bbox;
    const transform = getTranform(
      [width, height],
      [minLat, minLng],
      [latSpan, lngSpan],
    )

    let latLngList;
    if (geo.type === 'Polygon') {
      latLngList = arrayFlatten(geo.coordinates);
    } else {
      latLngList = arrayFlatten(arrayFlatten(
        geo.coordinates
      ));
    }

    const d = latLngList.map(
      function([lng, lat], i) {
        const [x, y] = transform([lat + LAT_CORRECTION, lng + LNG_CORRECTION])
        return `${(i === 0 ? 'M' : 'L')}${x},${y}`;
      },
    ).join(' ');

    return (
      <div className="div-region-map-data-view">
        <svg width={width} height={height} onClick={this.props.onClick}>
          <path className="path-region" d={d} />
        </svg>
      </div>
    )
  }
}
