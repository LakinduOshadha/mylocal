import GIGServer from 'model/GIGServer.js';

export async function getPlacesWithinRegion(placeEntityType, regionID) {
  const placeEntityIDs =
    (await GIGServer.getEntityIDs(placeEntityType))['entity_ids'];

  const entities = await Promise.all(
    placeEntityIDs.map(
      async function(entityID) {
        return await GIGServer.getEntity(entityID);
      },
    )
  );

  return entities.filter(
    function(entity) {
      return entity.gnd_id.includes(regionID);
    }
  );
}
