

import MathX from 'base/MathX.js';
import Format from './Format.js';

export default function CensusDescription(props) {
  const {dataMap} = props;

  const data = Object.entries(Object.values(dataMap)[0])
    .filter((x) => (x[0] !== 'entity_id') && (!x[0].includes('total_')))
    .sort((a, b) => b[1] - a[1]);
  const total = MathX.sum(data.map(x => x[1]));

  return data.map(
    function([k, v], i) {
      const renderedPct = Format.percent(v / total);
      const renderedLabel =  `"${Format.titleCase(k)}"`
      if (v > total * 0.99) {
        return `Almost completely ${renderedLabel} (${renderedPct}). `;
      } else if (v > total * 0.8) {
        return `Overwhelmingly ${renderedLabel} (${renderedPct}). `;
      } else if (v > total * 0.6) {
          return `Mostly ${renderedLabel} (${renderedPct}). `;

      } else if (i === 0) {
        return `${renderedLabel} (${renderedPct}). `;
      } else if (v > total * 0.1) {
        return `${renderedLabel} (${renderedPct}). `;
      }
      return undefined;
    }
  ).join('');
}
