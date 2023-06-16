import GeoData from '../server/GeoData.js';

export const TEST_GEO_SERVER_DISABLED = false;

export default class GeoServer{
  static async getGeo(regionID) {
    let  geo = await GeoData.getGeoForRegionID(regionID);
    geo = {"coordinates" : geo,"type":"MultiPolygon"}
    return geo;
  }

  static async getRegionInfo([lat, lng]) {
    const regions = await GeoData.latlngToRegion([lat, lng]);
    return regions;
  }
}
