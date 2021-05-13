export function getMapURL([x, y], zoom) {
  return `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`;
}

export function latLngToXY([lat, lng], zoom) {
  const x = ((lng + 180) / 360) * Math.pow(2, zoom);
  const y = ((1 -
      Math.log(
        Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
      ) /
        Math.PI) /
      2) *
      Math.pow(2, zoom)
  return [x, y];
}

export function xyToLatLng([x, y], zoom) {
  const lng = (x / Math.pow(2, zoom)) * 360 - 180;
  var n = Math.PI - (2 * Math.PI * y) / Math.pow(2, zoom);
  const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  return [lat, lng];
}

export function getLatLngSpans([width, height], zoom) {
  const latSpan = 1000 / Math.pow(2, zoom);
  const lngSpan = latSpan * width / height;
  return [latSpan, lngSpan];
}

export function getZoom(latSpan) {
  return parseInt(-Math.log2(latSpan / 1000));
}
