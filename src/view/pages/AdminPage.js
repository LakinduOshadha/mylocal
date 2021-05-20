import React from 'react';
import {getRegionBBox} from 'model/RegionGeo.js';
import {getZoom} from 'model/OSM.js';
import {redirectToDefault} from 'model/Browser';
import Entity, {ENTITY_LABEL_MAP, DEFAULT_ENTITY_ID} from 'model/Entity.js';

import RegionMap from '../components/RegionMap.js';
import Infobox from '../components/Infobox.js';
import EntityInfoTable from '../components/infotables/EntityInfoTable.js';

import Page from '../pages/Page.js';

export default class AdminPage extends Page {

  getRegionID() {
    return this.props.match.params.regionID || DEFAULT_ENTITY_ID;
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
        <Infobox subTitle={ENTITY_LABEL_MAP[regionType]} title={regionID}>
          <EntityInfoTable entityID={regionID}/>
        </Infobox>
      </div>
    );
  }

  renderInnerMapLayer() {
    const regionID = this.getRegionID()
    return (
      <RegionMap
        key={`RegionMap-${regionID}`}
        regionID={regionID}
      />
    );
  }
}
