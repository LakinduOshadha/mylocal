
export function getLatLngSpans([width, height], zoom) {
  const latSpan = 1000 / Math.pow(2, zoom);
  const lngSpan = latSpan * width / height;
  return [latSpan, lngSpan];
}

export function getZoom(latSpan) {
  return parseInt(-Math.log2(latSpan / 1000));
}
