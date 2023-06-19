import Server from './Server.js';

class GIGServerError extends Error {}

export default class GIGServer extends Server {

  static async getEntity(entityID) {
    const entity = await Server.run(
      'entity',
      [entityID],
    );
    if (!entity) {
      throw GIGServerError();
    }
    return entity;
  }

  static async getCensus(tableName, entityID) {
    const census = await Server.run(
      'census',
      [tableName, entityID],
    );
    if (!census) {
      throw GIGServerError();
    }
    for (let key in census[entityID]) {
      try {
        census[entityID][key] = parseInt(census[entityID][key])
      } catch {
      }
      
    }
    return census;
  }
}
