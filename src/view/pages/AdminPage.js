import React from 'react';

import Entity from 'model/Entity.js';
import {ENTITY_LABEL_MAP, DEFAULT_ENTITY_ID} from 'model/EntityConstants.js';

import {getRegionBBox} from 'model/RegionGeo.js';
import {getZoom} from 'model/OSM.js';
import {ENTITY} from 'model/EntityConstants.js';
import GeoServer from 'model/GeoServer.js';

import DetailedInfo from '../components/DetailedInfo.js';
import EntityInfoTable from '../components/infotables/EntityInfoTable.js';
import Infobox from '../components/Infobox.js';
import RegionMap from '../components/RegionMap.js';
import Page, {redirectToErrorPage} from '../pages/Page.js';

export default class AdminPage extends Page {

  constructor(props) {
    super(props);
    this.state =  {
      regionID: this.props.match.params.regionID || DEFAULT_ENTITY_ID,
    };
  }

  getRegionID() {
    return this.state.regionID;
  }

  async onChangeLocation([lat, lng]) {
    const region = await GeoServer.getRegionInfo([lat, lng]);
    const gndID = region[ENTITY.GND];
    this.setState({regionID: gndID});
  }

  async getLatLngAndZoom() {
    const regionID = this.getRegionID()

    let minLat, minLng, maxLat, maxLng;
    try {
      [[minLat, minLng], [maxLat, maxLng]] = await getRegionBBox(regionID);
    } catch {
      redirectToErrorPage();
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
      <div key={`div-admin-inner-${regionID}`}>
        <Infobox
          subTitle={ENTITY_LABEL_MAP[regionType]}
          title={regionID}
        >
          <EntityInfoTable entityID={regionID}/>
        </Infobox>
        <DetailedInfo entityID={regionID}/>
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
