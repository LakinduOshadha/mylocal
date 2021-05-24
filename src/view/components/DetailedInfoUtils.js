import Entity, {ENTITY, getEntityLabel} from 'model/Entity.js';
import GIGServer from 'model/GIGServer.js';
import {
  formatArea,
  formatPopulation,
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

function getAreaAndPopulation(entity) {
  return (
    <p>
      It has an area of {formatArea(entity.area)}, and a population
      of {formatPopulation(entity.population)} (2012 census).
    </p>
  )
}

function getTitle(entity) {
  const entityType = Entity.getEntityType(entity.id);
  return (
    <h1>{entity.name} {getEntityLabel(entityType)}</h1>
  )
}

function getRegionSummaryFirstLine(entity) {
  const entityType = Entity.getEntityType(entity.id);
  switch(entityType) {
    case ENTITY.PROVINCE:
      return (<>
        <p>
          The {entity.name} Province is one of the nine Provinces in Sri Lanka.
        </p>
      </>);
      case ENTITY.DISTRICT:
        return (<>
          <p>
            The {entity.name} District is one of the 25 Districts in Sri Lanka.
          </p>
        </>);
      case ENTITY.DSD:
        return (<>
          <p>
            The {entity.name} District is one of the 334 Divisional Secretariat
             Divisions in Sri Lanka.
          </p>
        </>);
      case ENTITY.GND:
        return (<>
          <p>
            The {entity.name} District is one of the 14021 Grama Niladhari
              Divisions in Sri Lanka.
          </p>
        </>);
    default:
      return null;
  }
}

async function getCensusInfo(tableName, entity) {
  const entityID = entity.id;
  const censusName = titleCase(
      tableName
        .replace('_of_population', '')
        .replace('_of_household', '')
        .replace('_by_household', '')
        .replace('_in_housing_unit', '')
  )
  const dataMap = await GIGServer.getCensus(tableName, entityID);
  return (<>
    <h2>{censusName}</h2>
    <p>
      <PieChart dataMap={dataMap}/>
    </p>
  </>);
}

async function getCensusInfos(entity) {
  return await Promise.all(CENSUS_TABLES.map(
    async function (tableName) {
      return await getCensusInfo(tableName, entity)
    }
  ));
}

async function getRegionSummary(entity) {
  const censusInfo = await getCensusInfos(entity);
  return (
    <>
    {getTitle(entity)}
    <hr/>
    {getRegionSummaryFirstLine(entity)}
    {getAreaAndPopulation(entity)}
    {censusInfo}
    </>
  );
}

export async function getSummary(entityID) {
  const entityType = Entity.getEntityType(entityID);
  const entity = await GIGServer.getEntity(entityID);

  switch(entityType) {
    case ENTITY.PROVINCE:
    case ENTITY.DISTRICT:
    case ENTITY.DSD:
    case ENTITY.GND:
      return getRegionSummary(entity)
    default:
      return null;
  }
}
