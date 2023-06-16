import Ents from '../server/Ents.js';
import GIG2 from '../server/GIG2.js';

export const TEST_GIG_SERVER_DISABLED = false;

export default class GIGServer {

  static async getEntity(entityID) {
    let entity = await Ents.getEnt(entityID);
    return entity;
  }

  static async getCensus(tableName, entityID) {
    const table = await GIG2.getTable(tableName);
    let census = table.filter((row) => row['entity_id'] === entityID);

    for (let key in census[0]) {
      try {
        census[0][key] = parseInt(census[0][key])
      } catch {
      }
      
    }
    return census;

  }
}
