import Entity, {ENTITY} from 'model/Entity.js';
import {
  formatArea,
  formatPhone,
  formatPopulation,
  formatAltitude,
  formatPopDensity,
} from 'view/FormatUtils.js';
import EntityLink from 'view/components/EntityLink.js';


function getIDInfo(entityData) {
  const cmp = (v) => (entityData.id.includes(v) ? 100 : 0) + v.length;
  console.debug(entityData);
  const idDataEntries = Object.entries(entityData).filter(
    function([k, v]) {
      return k.includes('_id');
    }
  ).sort(
    function([kA, vA], [kB, vB]) {
      return cmp(vB) - cmp(vA);
    }
  );

  return idDataEntries.reduce(
    function(idInfo, [k, v]) {
      const parentEntityType = Entity.getEntityType(v);
      idInfo[Entity.getEntityLabel(parentEntityType)] = (
          <EntityLink entityID={v} />
      );
      return idInfo;
    },
    {},
  )
}

function getSetsInfo(entityData) {
  let info = {};

  [
    ['eqs', 'Equivalent to'],
    ['subs', 'Contains'],
    ['supers', 'Contained in'],
    ['ints', 'Overlaps with'],
  ].forEach(
    function([k, label]) {
      const v = entityData[k];
      if (v && v.length > 0) {
        info[label] = (
          <div>
            {
              v.sort().map(
                (id) => (<div><EntityLink entityID={id} /></div>),
              )
            }
          </div>
        );
      }
    }
  )

  return info;
}

function getBaseInfo(entityData) {
  return Object.assign({}, getIDInfo(entityData), getSetsInfo(entityData), {
    Area: formatArea(entityData.area),
    Population: formatPopulation(entityData.population),
    'Pop. Density': formatPopDensity(entityData.population, entityData.area),
    'Altitude (Centroid)': formatAltitude(entityData.centroid_altitude),
  });
}


function getProvinceInfo(entityData) {
  return Object.assign({}, getBaseInfo(entityData), {
    'ISO 3166 code': entityData.province_id,
    'FIPS code': entityData.fips,
  });
}

function getDistrictInfo(entityData) {
  return Object.assign({}, getBaseInfo(entityData), {
    'ISO 3166 code': entityData.district_id,
    'FIPS code': entityData.fips,
    'HASC code': entityData.hasc,
  });
}

function getDSDInfo(entityData) {
  return Object.assign({}, getBaseInfo(entityData), {
    'ISO 3166 code': entityData.dsd_id,
    'HASC code': entityData.hasc,
  });
}

function getGNDInfo(entityData) {
  return Object.assign({}, getBaseInfo(entityData), {
    'GND Num': entityData.gnd_num,
    'ISO 3166 code': entityData.gnd_id,
  });
}

function getPSInfo(entityData) {
  return {
    Name: entityData.name + ' Police Station',
    Division: entityData.division + ' Division',
    Office: formatPhone(entityData.phone_office),
    Mobile: formatPhone(entityData.fax),
    Fax: formatPhone(entityData.phone_mobile),
  };
}

export default function getEntityInfo(entityType, entityData) {
  const entityTypeToInfoGetter = {
    [ENTITY.PROVINCE]: getProvinceInfo,
    [ENTITY.DISTRICT]: getDistrictInfo,
    [ENTITY.DSD]: getDSDInfo,
    [ENTITY.GND]: getGNDInfo,
    [ENTITY.PS]: getPSInfo,

    [ENTITY.ED]: getBaseInfo,
    [ENTITY.PD]: getBaseInfo,

    [ENTITY.MOH]: getBaseInfo,
    [ENTITY.LG]: getBaseInfo,
  };
  return entityTypeToInfoGetter[entityType](entityData);
}
