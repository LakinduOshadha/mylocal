import Server from './Server.js';

export default class GIGServer extends Server {

  static async multigetEntities(entityIDs) {
    const entities = await Server.run(
      'gig',
      'entities',
      [entityIDs.join(';')],
    );
    return entities;
  }

  static async getEntity(entityID) {
    const entities = await GIGServer.multigetEntities([entityID]);
    return entities && entities[entityID];
  }

  static async getEntityIDs(entityName) {
    const entityIDs = await Server.run(
      'gig',
      'entity_ids',
      [entityName],
    );
    return entityIDs;
  }

  static async getNearby([lat, lng]) {
    const nearby = (await Server.run(
      'gig',
      'nearby',
      [`${lat},${lng}`],
    ))
    return nearby && nearby['nearby_entity_info_list'];
  }

  static async getCensus(tableName, entityID) {
    const census = await Server.run(
      'gig',
      'ext_data',
      ['census', tableName, entityID],
    );
    return census;
  }
}
