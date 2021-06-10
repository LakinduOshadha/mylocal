import GeoServer from './GeoServer.js';
import {getBoundsForGeoData} from 'base/LatLng.js';

export async function getRegionBBox(regionID) {
  // throws GeoServerError
  const geo = await GeoServer.getGeo(regionID);
  const [[minLat, minLng], [maxLat, maxLng]] = getBoundsForGeoData(geo);
  return [[minLat, minLng], [maxLat, maxLng]];
}
