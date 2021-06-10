import GeoServer from './GeoServer.js';
import {getBoundsForGeoData} from 'base/LatLng.js';

export async function getRegionBBox(regionID) {
  const geo = await GeoServer.getGeo(regionID);
  if (!geo) {
    throw Error(`Could not get geo data for "${regionID}"`);
  }
  const [[minLat, minLng], [maxLat, maxLng]] = getBoundsForGeoData(geo);
  return [[minLat, minLng], [maxLat, maxLng]];
}
