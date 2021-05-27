import * as d3 from 'd3';

export const formatNumWithComma = d3.format(",")
export const formatPercent = d3.format(".2p")
export const formatArea = (area) => formatNumWithComma(area) + ' km²';
export const formatAltitude = (altitude) => formatNumWithComma(altitude) + ' m';

export const formatPopulation = formatNumWithComma;

export function formatPhone(phoneNumber) {
  const phoneNumberClean = phoneNumber.replaceAll('-', '')
  const phoneNumberStr = phoneNumberClean.substring(0, 3)
    + ' ' + phoneNumberClean.substring(3, 6)
    + ' ' + phoneNumberClean.substring(6, 10)
  return (
    <a href={`tel:${phoneNumberClean}`} className="monospace">
      {'☎ ' + phoneNumberStr}
    </a>
  );
}

export function titleCase(s) {
  s = s.replaceAll('_', ' ');
  return s.split(' ').map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1),
  ).join(' ');
}


export function formatPercentAndTotal(value, total) {
  if (total === 0) {
    return '-';
  }
  return (
    <span>
      <div className="div-percent">
        {formatPercent(value / total)}
      </div>
      <div className="div-total">
        {formatNumWithComma(value)}
      </div>
    </span>
  )
}

export function formatPopDensity(pop, area) {
  return d3.format(",.0f")(pop / area) + '/km²';
}
