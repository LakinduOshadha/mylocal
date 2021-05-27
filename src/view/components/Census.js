import GIGServer from 'model/GIGServer.js';
import MathX from 'model/MathX.js';
import {CENSUS_TABLES} from 'model/Census.js';
import {
  titleCase,
  formatPercent,
} from 'view/FormatUtils.js';
import PieChart from 'view/charts/PieChart.js';
import Pyramid from 'view/charts/Pyramid.js';

import './Census.css';

const ageKeysMap = {
  age_group_of_population: [
    ['less_than_10', 10],
    ['10_19', 10],
    ['20_29', 10],
    ['30_39', 10],
    ['40_49', 10],
    ['50_59', 10],
    ['60_69', 10],
    ['70_79', 10],
    ['80_89', 10],
    ['90_and_above', 10],
  ],
  year_of_construction_of_housing_unit: [
    ['before_80', 25],
    ['1980_1989', 10],
    ['1990_1994', 5],
    ['1995_1999', 5],
    ['2000_2004', 5],
    ['2005', 1],
    ['2006', 1],
    ['2007', 1],
    ['2008', 1],
    ['2009', 1],
    ['2010', 1],
    ['2011', 1],
  ],
  rooms_in_housing_unit: [
    ['1_room', 1],
    ['2_rooms', 1],
    ['3_rooms', 1],
    ['4_rooms', 1],
    ['5_rooms', 1],
    ['6_rooms', 1],
    ['7_rooms', 1],
    ['8_rooms', 1],
    ['9_rooms', 1],
  ],

}

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
  const entityID = entity.id;
  const censusName = titleCase(
      tableName
        .replace('_of_population', '')
        .replace('_of_household', '')
        .replace('_by_household', '')
        .replace('_in_housing_unit', '')
  )
  const dataMap = await GIGServer.getCensus(tableName, entityID);

  let ChartComponent;
  if (ageKeysMap[tableName]) {
      ChartComponent = Pyramid;
  } else {
      ChartComponent = PieChart;
  }

  const valueIsPercent =
    (tableName === 'communication_items_owned_by_household');

  return (
    <div key={`div-census-info-${iTable}-${tableName}`}>
      <h2>{censusName}</h2>
      {valueIsPercent ? null : renderDescription(dataMap)}
      <div className="div-census-chart-component">
        <ChartComponent
          dataMap={dataMap}
          tableName={tableName}
          ageKeys={ageKeysMap[tableName]}
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
