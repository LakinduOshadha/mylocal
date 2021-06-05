import React, {Component} from 'react';
import GIGServer from 'core/GIGServer.js';
import Entity from 'core/Entity.js';

import getEntityInfo from 'view/EntityInfo.js';
import InfoTable from 'stateless/molecules/InfoTable.js';

export default class EntityInfoPane extends Component {

  async getDataTable() {
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

  constructor(props) {
    super(props);
    this.state = {dataTable: undefined};
  }

  async componentDidMount() {
    this.setState({
        dataTable: await this.getDataTable(),
    });
  }

  render() {
    const {dataTable} = this.state;
    if (!dataTable) {
      return <div>Loading...</div>;
    }

    return (
      <InfoTable title="Entity Info" dataTable={dataTable} />
    )
  }
}
