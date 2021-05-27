import {indexArrayByKey} from 'model/DataStructures.js';
import Entity, {ENTITY} from 'model/Entity.js';
import {
  formatArea,
  formatPopulation,
  formatAltitude,
  formatPopDensity,
} from 'view/FormatUtils.js';
import EntityLink from 'view/components/EntityLink.js';

import {
  getProvinceInfo,
  getDistrictInfo,
  getDSDInfo,
  getGNDInfo,
  getPSInfo,
} from 'view/EntityInfoCustom.js';

import './EntityInfo.css';

function renderIDInfo(entityData) {
  const idDataEntries = Object.entries(entityData).filter(
    function([k, v]) {
      return k.includes('_id');
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
  if (!entityData.area) {
    return {};
  }
  const entityType = Entity.getEntityType(entityData.id);
  return Object.assign({},
    {
      Name: `${entityData.name} ${Entity.getEntityLabel(entityType)}`,
      Area: formatArea(entityData.area),
      Population: formatPopulation(entityData.population),
      'Pop. Density': formatPopDensity(entityData.population, entityData.area),
      'Altitude (Centroid)': formatAltitude(entityData.centroid_altitude),
    },
    renderIDInfo(entityData),
    renderSetsInfo(entityData),
  );
}

export default function getEntityInfo(entityType, entityData) {
  const entityTypeToInfoGetter = {
    [ENTITY.PROVINCE]: getProvinceInfo,
    [ENTITY.DISTRICT]: getDistrictInfo,
    [ENTITY.DSD]: getDSDInfo,
    [ENTITY.GND]: getGNDInfo,
    [ENTITY.PS]: getPSInfo,
  };
  return Object.assign({},
    getBaseInfo(entityData),
    entityTypeToInfoGetter[entityType]
      ? entityTypeToInfoGetter[entityType](entityData) : {},
  );
}
