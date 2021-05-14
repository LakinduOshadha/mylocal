import * as d3 from 'd3';

import GIGServer from '../model/GIGServer.js';
import Entity, {ENTITY} from '../model/Entity.js';

import AbstractInfoTable from '../components/AbstractInfoTable.js';



export default class EntityInfoTable extends AbstractInfoTable {
  getTitle() {
    return 'Basic Info';
  }
  async getDataList() {
    const {entityID} = this.props;

    const entityData = await GIGServer.getEntity(entityID);
    const entityType = Entity.getEntityType(entityID);

    let tableEntityData = undefined;
    const formatNumWithComma = d3.format(",")
    const formatArea = area => formatNumWithComma(area) + ' km²';
    const formatPopulation = formatNumWithComma;
    const formatPhone = function(phoneNumber) {
      const phoneNumberClean = phoneNumber.replaceAll('-', '')
      const phoneNumberStr = phoneNumberClean.substring(0, 3)
        + ' ' + phoneNumberClean.substring(3, 6)
        + ' ' + phoneNumberClean.substring(6, 10)
      return (
        <a href={`tel:${phoneNumberClean}`} className="monospace">
          {phoneNumberStr}
        </a>
      );
    }

    switch(entityType) {
      case ENTITY.PROVINCE:
        tableEntityData = {
          Name: entityData.name,
          Capital: entityData.capital,
          Area: formatArea(entityData.area),
          'ISO 3166 code': entityID,
          'FIPS code': entityData.fips,
        }
        break;
      case ENTITY.DISTRICT:
        tableEntityData = {
          Name: entityData.name,
          Population: formatPopulation(entityData.population),
          Area: formatArea(entityData.area),
          'ISO 3166 code': entityID,
          'FIPS code': entityData.fips,
          'HASC code': entityData.hasc,
        }
        break;
      case ENTITY.DSD:
        tableEntityData = {
          Name: entityData.name,
          Population: formatPopulation(entityData.population),
          Area: formatArea(entityData.area),
          'ISO 3166 code': entityID,
          'HASC code': entityData.hasc,
        }
        break;
      case ENTITY.GND:
        tableEntityData = {
          Name: entityData.name,
          'GND Num': entityData.gnd_num,
          'ISO 3166 code': entityID,
        }
        break;

      case ENTITY.PS:
        tableEntityData = {
          Name: entityData.name,
          Division: entityData.division,
          Office: formatPhone(entityData.phone_office),
          Mobile: formatPhone(entityData.fax),
          Fax: formatPhone(entityData.phone_mobile),
        }
        break;
      default:
        tableEntityData = entityData;
    }

    return Object.entries(tableEntityData).map(
      function([k, v]) {
        return {
          label: k,
          content: v,
        }
      }
    )
  }
}
