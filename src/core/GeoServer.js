import Server from './Server.js';

class GeoServerError extends Error {}

export default class GeoServer extends Server {
  static async getGeo(regionID) {
    const geo = await Server.run(
      'geo',
      'region_geo',
      [`${regionID}`],
    );
    if (!geo) {
      throw GeoServerError();
    }
    return geo;
  }

  static async getRegionInfo([lat, lng]) {
    const regions = await Server.run(
      'geo',
      'latlng_to_region',
      [`${lat},${lng}`],
    );
    if (!regions) {
      throw GeoServerError();
    }
    return regions;
  }
}
