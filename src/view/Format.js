import * as d3 from 'd3';

export default class Format {
  static numWithComma = d3.format(",")
  static percent = d3.format(".2p")
  static area = (area) => Format.numWithComma(area) + ' km²';
  static altitude = (altitude) => Format.numWithComma(altitude) + ' m';
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
    return (
      <span>
        <div className="div-percent">
          {Format.percent(value / total)}
        </div>
        <div className="div-total">
          {Format.numWithComma(value)}
        </div>
      </span>
    )
  }

  static popDensity(pop, area) {
    return d3.format(",.0f")(pop / area) + '/km²';
  }

}
