import GIGServer from 'model/GIGServer.js';
import Entity from 'model/Entity.js';

import getEntityInfo from 'view/EntityInfo.js';

import AbstractInfoTable from './AbstractInfoTable.js';

export default class EntityInfoTable extends AbstractInfoTable {

  getTitle() {
    return '';
  }

  renderRow(data, iRow) {
    let classNameCustom = '';
    const key = `row-${iRow}-${data.label}`;

    if (!data.content) {
      return (
        <tr key={key}>
          <th className={classNameCustom}>
            <h3>{data.label}</h3>
          </th>
        </tr>
      );
    }
    return (
      <tr key={key}>
        <th className={classNameCustom}>{data.label}</th>
        <td>{data.content}</td>
      </tr>
    );
  }

  async getDataList() {
    const {entityID} = this.props;
    const entityData = await GIGServer.getEntity(entityID);
    const entityType = Entity.getEntityType(entityID);
    const entityInfo  = await getEntityInfo(entityType, entityData);

    return Object.entries(entityInfo).map(
      function([k, v]) {
        return {
          label: k,
          content: v,
        }
      }
    )
  }
}
