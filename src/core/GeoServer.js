import Server from './Server.js';

export default class GeoServer extends Server {
  static async getGeo(regionID) {
    const geo = await Server.run(
      'geo',
      'region_geo',
      [`${regionID}`],
    );
    return geo;
  }

  static async getRegionInfo([lat, lng]) {
    const regions = await Server.run(
      'geo',
      'latlng_to_region',
      [`${lat},${lng}`],
    );
    return regions;
  }
}
