import GeoServer from './GeoServer.js';
import {getBoundsForGeoData} from './LatLng.js';

export async function getRegionBBox(regionID) {
  const geo = await GeoServer.getGeo(regionID);
  if (!geo) {
    throw Error(`Invalid regionI: ${regionID}`);
  }
  const [[minLat, minLng], [maxLat, maxLng]] = getBoundsForGeoData(geo);
  return [[minLat, minLng], [maxLat, maxLng]];
}
