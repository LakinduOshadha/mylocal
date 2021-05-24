import Entity, {ENTITY} from './Entity.js';
import GIGServer from './GIGServer.js';

export async function getSummary(entityID) {
  const entityType = Entity.getEntityType(entityID);
  const entity = await GIGServer.getEntity(entityID);

  switch(entityType) {
    case ENTITY.PROVINCE:
      return [
        `The ${entity.name} Province is one of the nine Provinces in Sri Lanka. It has an area of ${entity.area}km², and a population of ${entity.population} (2012 census)`,
      ].join(' ')
    default:
      return [
        `Basic summary about ${entity.name}`,
      ].join(' ')
  }
}
