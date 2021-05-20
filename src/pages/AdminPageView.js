import React from 'react';
import {DEFAULT_REGION_ID} from '../model/RegionConstants.js';
import {getRegionBBox} from '../model/RegionGeo.js';
import {getLatLngSpans, getZoom} from '../model/OSM.js';
import {redirectToDefault} from '../model/Browser';
import Entity, {ENTITY_LABEL_MAP} from '../model/Entity.js';

import RegionMapDataView from '../components/RegionMapDataView.js';
import Infobox from '../components/Infobox.js';
import EntityInfoTable from '../components/infotables/EntityInfoTable.js';

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
    const regionType = Entity.getEntityType(regionID);

    return (
      <div>
        <Infobox
          subTitle={ENTITY_LABEL_MAP[regionType]}
          title={regionID}
        >
          <EntityInfoTable
            entityID={regionID}
          />
        </Infobox>
      </div>
    );
  }

  renderInnerMapLayer() {
    const regionID = this.getRegionID()
    const regionType = Entity.getEntityType(regionID);

    const {zoom, latLng} = this.state;
    const [width, height] = [window.innerWidth, window.innerHeight];
    const [latSpan, lngSpan] = getLatLngSpans([width, height], zoom);
    const [lat, lng] = latLng;
    const [minLat, minLng] = [lat - latSpan / 2, lng - lngSpan / 2];

    return (
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
    );
  }
}
