import {indexArrayByKey} from 'model/DataStructures.js';
import {ENTITY} from 'model/EntityConstants.js';
import Entity from 'model/Entity.js';
import Format from 'view/Format.js';

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
  return Entity.getIDEntries(entityData).reduce(
    function(idInfo, [_, id]) {
      idInfo[Entity.getEntityLabel(Entity.getEntityType(id))] = (
          <EntityLink entityID={id} />
      );
      return idInfo;
    }, {},
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
      if (!ids || ids.length === 0) {
        return;
      }

      const typeToIds = indexArrayByKey(ids, Entity.getEntityType);

      info[label] = (
        <div className="div-id-groups">{
          Object.values(typeToIds).map(
            function(ids) {
              return (
                <div className="div-id-group">{
                    ids.sort().map(
                      (id) => (<div><EntityLink entityID={id} /></div>),
                    )
                }</div>
              );
            }
          )
        }</div>
      );
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
      Area: Format.area(entityData.area),
      Population: Format.population(entityData.population),
      'Pop. Density': Format.popDensity(entityData.population, entityData.area),
      'Altitude (Centroid)': Format.altitude(entityData.centroid_altitude),
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
