import GeoServer from '../model/GeoServer.js';
import {getBoundsForGeoData} from '../model/LatLng.js';

export async function getRegionBBox(regionType, regionID) {
  const geo = await GeoServer.getGeo(regionID);
  const [[minLat, minLng], [maxLat, maxLng]] = getBoundsForGeoData(geo);
  return [[minLat, minLng], [maxLat, maxLng]];
}
