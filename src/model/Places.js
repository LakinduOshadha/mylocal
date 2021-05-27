import GIGServer from 'model/GIGServer.js';

export async function getPlaceWithinGND(placeEntityType, gndID) {
  const placeEntityIDs = await GIGServer.getEntityIDs(placeEntityType);
  const entities = await GIGServer.multigetEntities(placeEntityIDs);
  return entities.filter(
    function(entity) {
      return entity.gndID === gndID;
    }
  );
}
