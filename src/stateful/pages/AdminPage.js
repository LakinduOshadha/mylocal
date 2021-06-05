import React from 'react';

import Entity from 'core/Entity.js';
import {ENTITY_LABEL_MAP, DEFAULT_ENTITY_ID} from 'constants/EntityConstants.js';

import {getRegionBBox} from 'core/RegionGeo.js';
import {getZoom} from 'base/OSM.js';
import {ENTITY} from 'constants/EntityConstants.js';
import GeoServer from 'core/GeoServer.js';

import DetailedInfoPane from 'stateful/molecules/DetailedInfoPane.js';
import EntityInfoPane from 'stateful/molecules/EntityInfoPane.js';
import Infobox from 'nonstate/molecules/Infobox.js';
import RegionMap from 'stateful/molecules/RegionMap.js';
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
    console.debug(regionID);
    let minLat, minLng, maxLat, maxLng;
    try {
      [[minLat, minLng], [maxLat, maxLng]] = await getRegionBBox(regionID);
      console.debug(regionID, [[minLat, minLng], [maxLat, maxLng]]);
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
          <EntityInfoPane entityID={regionID}/>
        </Infobox>
        <DetailedInfoPane entityID={regionID}/>
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
