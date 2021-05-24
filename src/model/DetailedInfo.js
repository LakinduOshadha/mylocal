import Entity, {ENTITY, getEntityLabel} from './Entity.js';
import GIGServer from './GIGServer.js';
import {
  formatArea,
  formatPopulation,
  titleCase,
} from 'model/FormatUtils.js';

const CENSUS_TABLES = [
    'ethnicity_of_population',
    'religious_affiliation_of_population',
    'age_group_of_population',
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
  const census = await GIGServer.getCensus(tableName, entityID);
  const censusName = titleCase(tableName.replace('_of_population', ''))
  return (<>
    <h2>{censusName}</h2>
    <p>
      {JSON.stringify(census)}
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
