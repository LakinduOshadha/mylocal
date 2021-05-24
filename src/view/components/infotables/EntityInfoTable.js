import GIGServer from 'model/GIGServer.js';
import Entity from 'model/Entity.js';

import getEntityInfo from 'view/EntityInfo.js';

import AbstractInfoTable from './AbstractInfoTable.js';

export default class EntityInfoTable extends AbstractInfoTable {

  getTitle() {
    return '';
  }

  renderRow(data, iRow) {
    const key = `row-${iRow}-${data.label}`;
    return (
      <tr key={key}>
        <th>{data.label}</th>
        <td>{data.content}</td>
      </tr>
    );
  }

  async getDataList() {
    const {entityID} = this.props;
    const entityData = await GIGServer.getEntity(entityID);
    const entityType = Entity.getEntityType(entityID);

    return Object.entries(getEntityInfo(entityType, entityData)).map(
      function([k, v]) {
        return {
          label: k,
          content: v,
        }
      }
    )
  }
}
