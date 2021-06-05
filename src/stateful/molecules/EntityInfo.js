import {indexArrayByKey} from 'core/DataStructures.js';
import {ENTITY} from 'core/EntityConstants.js';
import Entity from 'core/Entity.js';
import Format from 'stateless/atoms/Format.js';

import EntityLink from 'stateful/atoms/EntityLink.js';
import EntityLinkListList from 'stateful/molecules/EntityLinkListList.js';

import {
  getProvinceInfo,
  getDistrictInfo,
  getDSDInfo,
  getGNDInfo,
} from 'stateful/molecules/EntityInfoCustom.js';

export function getParentEntityInfo(entityData) {
  return Entity.getIDEntries(entityData).reduce(
    function(idInfo, [_, id]) {
      idInfo[Entity.getEntityLabel(Entity.getEntityType(id))] = (
        <EntityLink entityID={id} />
      );
      return idInfo;
    }, {},
  )
}

export function getRelatedEntityInfo(entityData) {
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
        [label]: (<EntityLinkListList entityIDListList={idListList} />),
      });
    },
    {},
  );
}

export async function getBaseInfo(entityData) {
  const entityType = Entity.getEntityType(entityData.id);
  return Object.assign({},
    {
      Name: `${entityData.name} ${Entity.getEntityLabel(entityType)}`,
      Area: Format.area(entityData.area),
      Population: Format.population(entityData.population),
      'Pop. Density': Format.popDensity(entityData.population, entityData.area),
      'Altitude (Centroid)': Format.altitude(entityData.centroid_altitude),
    },
  );
}

export async function getCustomInfo(entityData) {
  const entityType = Entity.getEntityType(entityData.id);
  const getter = {
    [ENTITY.PROVINCE]: getProvinceInfo,
    [ENTITY.DISTRICT]: getDistrictInfo,
    [ENTITY.DSD]: getDSDInfo,
    [ENTITY.GND]: getGNDInfo,
  };
  return Object.assign({},
    getter[entityType] ? (await getter[entityType](entityData)) : {},
  );
}
