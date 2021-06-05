import React, {Component} from 'react';
import GIGServer from 'core/GIGServer.js';
import Entity from 'core/Entity.js';

import {
  getBaseInfo,
  getParentEntityInfo,
  getCustomInfo,
  getRelatedEntityInfo,
} from 'view/EntityInfo.js';
import InfoTable from 'stateless/molecules/InfoTable.js';

export default class EntityInfoPane extends Component {

  constructor(props) {
    super(props);
    this.state = {dataTable: undefined};
  }

  async componentDidMount() {
    const {entityID} = this.props;
    const entityData = await GIGServer.getEntity(entityID);

    this.setState({
      baseInfo: await getBaseInfo(entityData),
      parentEntityInfo: getParentEntityInfo(entityData),
      customInfo: await getCustomInfo(entityData),
      relatedEntityInfo: getRelatedEntityInfo(entityData),
    });
  }

  render() {
    const {
      baseInfo,
      parentEntityInfo,
      customInfo,
      relatedEntityInfo,
    } = this.state;

    if (!baseInfo) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <InfoTable title="Basic Info" dataMap={baseInfo} />
        <InfoTable title="Parent Regions" dataMap={parentEntityInfo} />
        <InfoTable title="Custom Info" dataMap={customInfo} />
        <InfoTable title="Related Regions" dataMap={relatedEntityInfo} />
      </>
    )
  }
}
