import GIGServer from 'model/GIGServer.js';
import MathX from 'model/MathX.js';
import {
  CENSUS_TABLE_GROUPS,
  getCensusLabel,
  CENSUS_TABLE_SPAN_INFO,
} from 'model/Census.js';
import Format from 'view/Format.js';
import PieChart from 'view/charts/PieChart.js';
import Pyramid from 'view/charts/Pyramid.js';
import Reference from 'view/components/Reference.js';

import './Census.css';

function renderDescription(dataMap) {
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
      <h3>{getCensusLabel(tableName)}</h3>
      {valueIsPercent ? null : renderDescription(dataMap)}
      <div className="div-census-chart-component">
        <ChartComponent
          dataMap={dataMap}
          tableName={tableName}
          ageKeys={CENSUS_TABLE_SPAN_INFO[tableName]}
          valueIsPercent={valueIsPercent}
        />
      </div>
      <Reference
        title="Data Source"
        label="Department of Census and Statistics, Sri Lanka"
        link="http://www.statistics.gov.lk/"
      />
    </div>
  );
}

async function renderCensusInfoGroup(groupName, tableNames, entity) {
  const renderedInner = await Promise.all(
    tableNames.map(
      async function (tableName, iTable) {
        return await renderCensusInfo(tableName, entity, iTable)
      }
    )
  );
  return (
    <div>
      <h2>{groupName}</h2>
      {renderedInner}
    </div>
  )
}

export async function renderCensusInfoGroups(entity) {
  return await Promise.all(
    Object.entries(CENSUS_TABLE_GROUPS).map(
      async function ([groupName, tableNames]) {
        return await renderCensusInfoGroup(groupName, tableNames, entity)
      }
    )
  );
}
