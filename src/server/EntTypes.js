import {ENTITY} from 'constants/EntityConstants.js';

export default class EntTypes {
  static getEntTypes() {
    return Object.values(ENTITY);
  }
  static getEntType(entID) {
    if (entID.substring(0, 2) === "LK") {
      const entIDLength = entID.length;
      switch (entIDLength) {
        case 2:
          return ENTITY.COUNTRY;
        case 4:
          return ENTITY.PROVINCE;
        case 5:
          return ENTITY.DISTRICT;
        case 7:
          return ENTITY.DSD;
        case 10:
          return ENTITY.GND;
        default:
          return ENTITY.UNKNOWN;
      }
    }
    if (entID.substring(0, 2) === "EC") {
      const entIDLength = entID.length;
      switch (entIDLength) {
        case 5:
          return ENTITY.ED;
        case 6:
          return ENTITY.PD;
        default:
          return ENTITY.UNKNOWN;
      }
    }

    if (entID.substring(0, 2) === "LG") {
      return ENTITY.LG;
    }

    if (entID.substring(0, 3) === "MOH") {
      return ENTITY.MOH;
    }
    return ENTITY.UNKNOWN;
  }

}
