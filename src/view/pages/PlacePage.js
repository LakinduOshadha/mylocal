import React from 'react';
import GIGServer from 'model/GIGServer.js';
import Entity from 'model/Entity.js';
import {ENTITY_LABEL_MAP} from 'model/EntityConstants.js';

import Page, {DEFAULT_ZOOM} from '../pages/Page.js';
import Infobox from '../components/Infobox.js';
import EntityInfoTable from '../components/infotables/EntityInfoTable.js';

export default class PlacePage extends Page {

  async getLatLngAndZoom() {
    const {entityID} = this.props.match.params;
    const zoom = DEFAULT_ZOOM + 1;
    const entity = await GIGServer.getEntity(entityID);
    const latLng = [parseFloat(entity.lat), parseFloat(entity.lng)];

    return {
      latLng,
      zoom,
    };
  }

  renderInner() {
    const {entityID} = this.props.match.params;
    const entityType = Entity.getEntityType(entityID);
    const entityLabel = ENTITY_LABEL_MAP[entityType];
    return (
      <Infobox
        subTitle={entityLabel}
        title={entityID}
      >
        <EntityInfoTable entityID={entityID} />
      </Infobox>
    );
  }
}
