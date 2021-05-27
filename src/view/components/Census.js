import GIGServer from 'model/GIGServer.js';
import {
  titleCase,
} from 'view/FormatUtils.js';
import PieChart from 'view/charts/PieChart.js';

const CENSUS_TABLES = [
  'ethnicity_of_population',
  'religious_affiliation_of_population',
  'gender_of_population',
  'age_group_of_population',
  'relationship_to_household_head_of_population',
  'communication_items_owned_by_household',
  'cooking_fuel_of_household',
  'roof_type_in_housing_unit',
  'rooms_in_housing_unit',
  'floor_type_in_housing_unit',
  'solid_waste_disposal_by_household',
  'source_of_drinking_water_of_household',
  'households_living_in_housing_unit',
  'structure_of_housing_units',
  'housing_ownership_status_of_household',
  'toilet_facilities_of_household',
  'lighting_of_household',
  'living_quarters',
  'type_of_housing_unit',
  'marital_status_of_population',
  'wall_type_in_housing_units',
  'occupation_status_of_housing_units',
  'year_of_construction_of_housing_unit',
  'persons_living_in_housing_unit',
];

function renderDescription(dataMap) {
  return 'TODO';
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
  return (
    <div key={`div-census-info-${iTable}-${tableName}`}>
      <h2>{censusName}</h2>
      {renderDescription(dataMap)}
      <div>
        <PieChart dataMap={dataMap} tableName={tableName}/>
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
