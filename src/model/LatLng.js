import {arrayFlatten} from '../model/DataStructures.js';

export function getTranform(
  [width, height],
  [minLat, minLng],
  [latSpan, lngSpan],
) {
  return function([lat, lng]) {
    return [
      width * (lng - minLng) / lngSpan,
      height * (1 - (lat - minLat) / latSpan),
    ];
  }
}

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

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

export function getDistance([lat1, lng1], [lat2, lng2]) {
  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dlng = deg2rad(lng2 - lng1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dlng / 2) * Math.sin(dlng / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}
