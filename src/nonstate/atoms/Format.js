import * as d3 from 'd3';

const FT_PER_M = 3.28084;
// const MILE_PER_KM = 0.621371;

export default class Format {
  static numWithComma = d3.format(",")
  static percent = d3.format(".2p")

  static area(area) {
    return `${Format.numWithComma(area)} km²`;
  };

  static altitude(altitude) {
    return `${Format.numWithComma(altitude)} m
      (${Format.numWithComma(Math.round(altitude * FT_PER_M))} ft)`;
  };
  static population = Format.numWithComma;

  static phoneNum(phoneNumber) {
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

  static titleCase(s) {
    s = s.replaceAll('_', ' ');
    return s.split(' ').map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1),
    ).join(' ');
  }

  static percentAndTotal(value, total) {
    if (total === 0) {
      return '-';
    }
    const p = value / total;
    let fontSize = Math.max(12, parseInt(Math.sqrt(p) * 24));
    const stylePercent = {fontSize}
    const styleValue = {
      fontSize: parseInt(fontSize * 0.8),
      color: 'gray',
    }

    return (
      <span>
        <div className={'div-percent'} style={stylePercent}>
          {Format.percent(p)}
        </div>
        <div className="div-total" style={styleValue}>
          {Format.numWithComma(value)}
        </div>
      </span>
    )
  }

  static popDensity(pop, area) {
    return d3.format(",.0f")(pop / area) + '/km²';
  }

}
