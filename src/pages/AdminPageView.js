import {DEFAULT_REGION_ID} from '../model/RegionConstants.js';
import {getRegionType} from '../model/Region.js';
import {getRegionBBox} from '../model/RegionGeo.js';
import {getLatLngSpans, getZoom} from '../model/OSM.js';
import {redirectToDefault} from '../model/Browser';

import RegionMapDataView from '../components/RegionMapDataView.js';
import RegionInfobox from '../components/RegionInfobox.js';

import PageView from '../pages/PageView.js';

export default class AdminPageView extends PageView {

  getRegionID() {
    return this.props.match.params.regionID || DEFAULT_REGION_ID;
  }

  async getLatLngAndZoom() {
    const regionID = this.getRegionID()

    let minLat, minLng, maxLat, maxLng;
    try {
      [[minLat, minLng], [maxLat, maxLng]] = await getRegionBBox(regionID);
    } catch {
      redirectToDefault();
    }

    const latLng = [(minLat + maxLat) / 2, (minLng + maxLng) / 2];
    const latSpan = maxLat - minLat;
    const zoom = getZoom(latSpan);

    return {
      latLng,
      zoom,
    };
  }

  renderInner() {
    const regionID = this.getRegionID()
    const regionType = getRegionType(regionID);

    const {zoom, latLng} = this.state;
    const [width, height] = [window.innerWidth, window.innerHeight];
    const [latSpan, lngSpan] = getLatLngSpans([width, height], zoom);
    const [lat, lng] = latLng;
    const [minLat, minLng] = [lat - latSpan / 2, lng - lngSpan / 2];

    return (
      <div>
        <RegionMapDataView
          key={`RegionMapDataView-${regionID}`}
          regionID={regionID}
          regionType={regionType}
          width={width}
          height={height}
          bbox={[[minLat, minLng], [latSpan, lngSpan]]}
          latLng={this.state.latLng}
          onClick={this.onClick.bind(this)}
        />
        <RegionInfobox
          key={`RegionInfobox-${regionID}`}
          regionID={regionID}
        />
      </div>
    );
  }
}
