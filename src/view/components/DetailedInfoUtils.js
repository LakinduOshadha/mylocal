import Entity from 'core/Entity.js';
import {ENTITY} from 'core/EntityConstants.js';

import GIGServer from 'core/GIGServer.js';
import {renderCensusInfoGroups} from './Census.js';

async function getRegionSummary(entity) {
  const censusInfos = await renderCensusInfoGroups(entity);
  return (
    <div key={'div-region-summary-' + entity.id}>
      {censusInfos}
    </div>
  );
}

export async function getSummary(entityID) {
  const entityType = Entity.getEntityType(entityID);
  const entity = await GIGServer.getEntity(entityID);

  switch(entityType) {
    case ENTITY.PROVINCE:
    case ENTITY.DISTRICT:
    case ENTITY.DSD:
    case ENTITY.GND:
    case ENTITY.PD:
    case ENTITY.ED:
    case ENTITY.MOH:
    case ENTITY.LG:
      return getRegionSummary(entity)
    default:
      return null;
  }
}
