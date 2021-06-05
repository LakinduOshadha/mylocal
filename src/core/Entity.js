import {
  EC_ID_LENGTH_TO_ENTITY,
  ENTITY,
  ENTITY_LABEL_MAP,
  ENTITY_LABEL_SHORT_MAP,
  ISO_ID_LENGTH_TO_ENTITY,
} from 'constants/EntityConstants.js';

export default class Entity {

  static isISORegionType(entityID) {
    return entityID.substring(0, 2) === 'LK';
  }

  static isECType(entityID) {
    return entityID.substring(0, 2) === 'EC';
  }

  static getEntityType(entityID) {
    if (!entityID) {
      return ENTITY.UNKNOWN;
    }
    const idLength = entityID.length;

    if (Entity.isISORegionType(entityID)) {
      return ISO_ID_LENGTH_TO_ENTITY[idLength] || undefined;
    }

    else if (Entity.isECType(entityID)) {
      return EC_ID_LENGTH_TO_ENTITY[idLength] || undefined;
    }

    else if (entityID.substring(0, 2) === 'PS') {
      return ENTITY.PS;
    }

    else if (entityID.substring(0, 3) === 'MOH') {
      return ENTITY.MOH;
    }

    else if (entityID.substring(0, 2) === 'LG') {
      return ENTITY.LG;
    }

    return undefined;
  }

  static getEntityLabel(entityType) {
    return ENTITY_LABEL_MAP[entityType];
  }

  static getEntityLabelShort(entityType) {
    return ENTITY_LABEL_SHORT_MAP[entityType];
  }

  static getIDEntries(entityData) {
    return Object.entries(entityData).filter(
      function([k, v]) {
        return k.includes('_id');
      }
    );
  }


}
