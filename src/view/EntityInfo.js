import {ENTITY} from 'model/Entity.js';
import {
  formatArea,
  formatPhone,
  formatPopulation,
} from 'view/FormatUtils.js';
import EntityLink from 'view/components/EntityLink.js';


function getProvinceInfo(entityData) {
  return {
    Name: entityData.name + ' Province',
    Population: formatPopulation(entityData.population),
    Area: formatArea(entityData.area),
    'ISO 3166 code': entityData.province_id,
    'FIPS code': entityData.fips,
  };
}

function getDistrictInfo(entityData) {
  return {
    Name: entityData.name + ' District',
    Population: formatPopulation(entityData.population),
    Area: formatArea(entityData.area),
    'ISO 3166 code': entityData.district_id,
    'FIPS code': entityData.fips,
    'HASC code': entityData.hasc,
    Province: <EntityLink entityID={entityData.province_id} />,
  };
}

function getDSDInfo(entityData) {
  return {
    Name: entityData.name + ' DSD',
    Population: formatPopulation(entityData.population),
    Area: formatArea(entityData.area),
    'ISO 3166 code': entityData.dsd_id,
    'HASC code': entityData.hasc,
    District: <EntityLink entityID={entityData.district_id} />,
    Province: <EntityLink entityID={entityData.province_id} />,
  };
}

function getGNDInfo(entityData) {
  return {
    Name: entityData.name + ' GND',
    Population: formatPopulation(entityData.population),
    Area: formatArea(entityData.area),
    'GND Num': entityData.gnd_num,
    'ISO 3166 code': entityData.gnd_id,
    DSD: <EntityLink entityID={entityData.dsd_id} />,
    District: <EntityLink entityID={entityData.district_id} />,
    Province: <EntityLink entityID={entityData.province_id} />,
  };
}

function getPSInfo(entityData) {
  return {
    Name: entityData.name + ' Police Station',
    Division: entityData.division + ' Division',
    Office: formatPhone(entityData.phone_office),
    Mobile: formatPhone(entityData.fax),
    Fax: formatPhone(entityData.phone_mobile),
  }
}

export default function getEntityInfo(entityType, entityData) {
  const entityTypeToInfoGetter = {
    [ENTITY.PROVINCE]: getProvinceInfo,
    [ENTITY.DISTRICT]: getDistrictInfo,
    [ENTITY.DSD]: getDSDInfo,
    [ENTITY.GND]: getGNDInfo,
    [ENTITY.PS]: getPSInfo,
  };
  return entityTypeToInfoGetter[entityType](entityData);
}
