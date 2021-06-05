
import MathX from 'core/MathX.js';
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
      if (v > total * 0.5) {
        return `Mostly ${renderedLabel} (${renderedPct}). `;
      } else if (i === 0) {
        return `Mostly ${renderedLabel} (${renderedPct}). `;
      } else if (v > total * 0.25) {
        return `Followed by ${renderedLabel} (${renderedPct}). `;
      }
      return undefined;
    }
  ).join('');
}
