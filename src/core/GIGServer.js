import Server from './Server.js';

class GIGServerError extends Error {}

export default class GIGServer extends Server {

  static async multigetEntities(entityIDs) {
    const entities = await Server.run(
      'gig',
      'entities',
      [entityIDs.join(';')],
    );
    if (!entities) {
      throw GIGServerError();
    }
    return entities;
  }

  static async getEntity(entityID) {
    const entities = await GIGServer.multigetEntities([entityID]);
    if (!entities) {
      throw GIGServerError();
    }
    return entities && entities[entityID];
  }

  static async getEntityIDs(entityName) {
    const entityIDs = await Server.run(
      'gig',
      'entity_ids',
      [entityName],
    );
    if (!entityIDs) {
      throw GIGServerError();
    }
    return entityIDs;
  }

  static async getNearby([lat, lng]) {
    const nearby = (await Server.run(
      'gig',
      'nearby',
      [`${lat},${lng}`],
    ))
    if (!nearby) {
      throw GIGServerError();
    }
    return nearby['nearby_entity_info_list'];
  }

  static async getCensus(tableName, entityID) {
    const census = await Server.run(
      'gig',
      'ext_data',
      ['census', tableName, entityID],
    );
    if (!census) {
      throw GIGServerError();
    }
    return census;
  }
}
