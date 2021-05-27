import {indexArrayByKey} from 'model/DataStructures.js';
import Entity, {ENTITY} from 'model/Entity.js';
import {
  formatArea,
  formatPhone,
  formatPopulation,
  formatAltitude,
  formatPopDensity,
} from 'view/FormatUtils.js';
import EntityLink from 'view/components/EntityLink.js';

import './EntityInfo.css';

function renderIDInfo(entityData) {
  const cmp = (v) => (entityData.id.includes(v) ? 100 : 0) + v.length;
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

function renderSetsInfo(entityData) {
  let info = {};

  [
    ['eqs', 'Equivalent to'],
    ['subs', 'Contains'],
    ['supers', 'Contained in'],
    ['ints', 'Overlaps with'],
  ].forEach(
    function([k, label]) {
      const ids = entityData[k];
      if (ids && ids.length > 0) {

        const typeToIds = indexArrayByKey(ids, Entity.getEntityType);

        info[label] = (
          <div className="div-id-groups">
          {
            Object.values(typeToIds).map(
              function(ids) {
                return (
                  <div className="div-id-group">
                    {
                      ids.sort().map(
                        (id) => (<div><EntityLink entityID={id} /></div>),
                      )
                    }
                  </div>
                );
              }
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
  return Object.assign({}, renderIDInfo(entityData), renderSetsInfo(entityData), {
    Area: formatArea(entityData.area),
    Population: formatPopulation(entityData.population),
    'Pop. Density': formatPopDensity(entityData.population, entityData.area),
    'Altitude (Centroid)': formatAltitude(entityData.centroid_altitude),
  });
}


function getProvinceInfo(entityData) {
  return Object.assign({}, getBaseInfo(entityData), {
    'ISO 3166 code': entityData.id,
    'FIPS code': entityData.fips,
  });
}

function getDistrictInfo(entityData) {
  return Object.assign({}, getBaseInfo(entityData), {
    'ISO 3166 code': entityData.id,
    'FIPS code': entityData.fips,
    'HASC code': entityData.hasc,
  });
}

function getDSDInfo(entityData) {
  return Object.assign({}, getBaseInfo(entityData), {
    'ISO 3166 code': entityData.id,
    'HASC code': entityData.hasc,
  });
}

function getGNDInfo(entityData) {
  return Object.assign({}, getBaseInfo(entityData), {
    'ISO 3166 code': entityData.id,
    'GND Num': entityData.gnd_num,
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
