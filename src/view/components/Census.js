import GIGServer from 'model/GIGServer.js';
import MathX from 'model/MathX.js';
import {
  CENSUS_TABLES,
  getCensusLabel,
  CENSUS_TABLE_SPAN_INFO,
} from 'model/Census.js';
import {
  titleCase,
  formatPercent,
} from 'view/FormatUtils.js';
import PieChart from 'view/charts/PieChart.js';
import Pyramid from 'view/charts/Pyramid.js';

import './Census.css';

function renderDescription(dataMap) {
  const data = Object.entries(Object.values(dataMap)[0])
    .filter((x) => (x[0] !== 'entity_id') && (!x[0].includes('total_')))
    .sort((a, b) => b[1] - a[1]);
  const total = MathX.sum(data.map(x => x[1]));

  return data.map(
    function([k, v], i) {
      const renderedPct = formatPercent(v / total);
      const renderedLabel =  `"${titleCase(k)}"`
      if (v > total * 0.5) {
        return `${renderedLabel} majority (${renderedPct}). `;
      } else if (i === 0) {
        return `${renderedLabel} plurality (${renderedPct}). `;
      } else if (v > total * 0.25) {
        return `Significant ${renderedLabel} minority (${renderedPct}). `;
      }
      return undefined;
    }
  ).join('');
}

async function renderCensusInfo(tableName, entity, iTable) {
  const dataMap = await GIGServer.getCensus(tableName, entity.id);

  let ChartComponent;
  if (CENSUS_TABLE_SPAN_INFO[tableName]) {
      ChartComponent = Pyramid;
  } else {
      ChartComponent = PieChart;
  }

  const valueIsPercent =
    (tableName === 'communication_items_owned_by_household');

  return (
    <div key={`div-census-info-${iTable}-${tableName}`}>
      <h2>{getCensusLabel(tableName)}</h2>
      {valueIsPercent ? null : renderDescription(dataMap)}
      <div className="div-census-chart-component">
        <ChartComponent
          dataMap={dataMap}
          tableName={tableName}
          ageKeys={CENSUS_TABLE_SPAN_INFO[tableName]}
          valueIsPercent={valueIsPercent}
        />
      </div>
    </div>
  );
}

export async function renderCensusInfos(entity) {
  return await Promise.all(
    CENSUS_TABLES.map(
      async function (tableName, iTable) {
        return await renderCensusInfo(tableName, entity, iTable)
      }
    )
  );
}
