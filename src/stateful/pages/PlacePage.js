import React from 'react';
import GIGServer from 'core/GIGServer.js';
import Entity from 'core/Entity.js';
import {ENTITY_LABEL_MAP} from 'core/EntityConstants.js';

import Page, {DEFAULT_ZOOM} from '../pages/Page.js';
import Infobox from 'stateless/molecules/Infobox.js';
import InfoTable from 'view/components/infotables/InfoTable.js';

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
        <InfoTable entityID={entityID} />
      </Infobox>
    );
  }
}
