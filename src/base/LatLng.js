import {arrayFlatten} from './DataStructures.js';

export function roundLatLng([lat, lng]) {
  const Q = 10 ** 6;
  const r = (x) => Math.round(x * Q) / Q;
  return [r(lat), r(lng)];
}

export function parseLatLngAndZoom(s) {
  const [latStr, lngStr, zoomStr] =
    s.replaceAll(/(N|E|W|S|z)/g, '').split(',');
  return {
    latLng: roundLatLng([latStr, lngStr]),
    zoom: parseInt(zoomStr),
  }
}

export function latLngAndZoomToString([lat, lng], zoom) {
  return `${lat}N,${lng}E,${zoom}z`;
}

export function getBoundsForGeoData(geoData) {
  const type = geoData.type;
  let latLngList;
  if (type === 'MultiPolygon') {
    latLngList = arrayFlatten(arrayFlatten(geoData.coordinates));
  }
  else if (type === 'Polygon') {
    latLngList = arrayFlatten(geoData.coordinates);
  }

  return getBounds(latLngList.map(x => [x[1], x[0]]));
}

export function getBounds(latLngList) {
  return latLngList.reduce(
    function([[minLat, minLng], [maxLat, maxLng]], [lat, lng]) {
      return [
        [
          Math.min(minLat, lat),
          Math.min(minLng, lng),
        ],
        [
          Math.max(maxLat, lat),
          Math.max(maxLng, lng),
        ],
      ]
    },
    [[180, 180], [-180, -180]],
  );
}
