import {indexArrayByKey} from 'core/DataStructures.js';
import {ENTITY} from 'core/EntityConstants.js';
import Entity from 'core/Entity.js';
import Format from 'stateless/atoms/Format.js';

import {renderID, renderIDListList} from 'view/components/EntityLink.js';

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
      idInfo[Entity.getEntityLabel(Entity.getEntityType(id))] = renderID(id);
      return idInfo;
    }, {},
  )
}

function renderSetsInfo(entityData) {
  return [
    ['eqs', 'Equivalent to'],
    ['subs', 'Contains'],
    ['supers', 'Contained in'],
    ['ints', 'Overlaps with'],
  ].reduce(
    function(info, [k, label]) {
      const idListList = Object.values(
        indexArrayByKey(entityData[k], Entity.getEntityType),
      );
      if (idListList.length === 0) {
        return info;
      }
      return Object.assign(info, {
        [label]: (<div>{renderIDListList(idListList)}</div>),
      });
    },
    {},
  );
}

async function getBaseInfo(entityData) {
  if (!entityData.area) {
    return {};
  }
  const entityType = Entity.getEntityType(entityData.id);
  return Object.assign({},
    {
      'Basic Info': undefined,
      Name: `${entityData.name} ${Entity.getEntityLabel(entityType)}`,
      Area: Format.area(entityData.area),
      Population: Format.population(entityData.population),
      'Pop. Density': Format.popDensity(entityData.population, entityData.area),
      'Altitude (Centroid)': Format.altitude(entityData.centroid_altitude),
      'Parent Regions': undefined,
    },
    renderIDInfo(entityData),
  );
}

export default async function getEntityInfo(entityType, entityData) {
  const entityTypeToInfoGetter = {
    [ENTITY.PROVINCE]: getProvinceInfo,
    [ENTITY.DISTRICT]: getDistrictInfo,
    [ENTITY.DSD]: getDSDInfo,
    [ENTITY.GND]: getGNDInfo,
    [ENTITY.PS]: getPSInfo,
  };
  return Object.assign({},
    await getBaseInfo(entityData),
    entityTypeToInfoGetter[entityType]
      ? (await entityTypeToInfoGetter[entityType](entityData)) : {},
    {'Related Regions': undefined},
    renderSetsInfo(entityData),
  );
}
