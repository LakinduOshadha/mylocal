import * as d3 from 'd3';

export const formatNumWithComma = d3.format(",")
export const formatArea = (area) => formatNumWithComma(area) + ' km²';

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
