import React, {Component} from 'react';
import GIGServer from 'core/GIGServer.js';

import Loader from 'nonstate/atoms/Loader.js';
import InfoTable from 'nonstate/molecules/InfoTable.js';
import {
  getBaseInfo,
  getParentEntityInfo,
  getCustomInfo,
  getRelatedEntityInfo,
} from 'stateful/molecules/EntityInfo.js';



import './EntityInfoPane.css';

export default class EntityInfoPane extends Component {

  constructor(props) {
    super(props);
    this.state = {dataTable: undefined};
  }

  async componentDidMount() {
    const {entityID} = this.props;

    try {
      const entityData = await GIGServer.getEntity(entityID);
      this.setState({
        baseInfo: await getBaseInfo(entityData),
        parentEntityInfo: getParentEntityInfo(entityData),
        customInfo: await getCustomInfo(entityData),
        relatedEntityInfo: getRelatedEntityInfo(entityData),
      });
    } catch(err) {}
  }

  render() {
    const {
      baseInfo,
      parentEntityInfo,
      customInfo,
      relatedEntityInfo,
    } = this.state;

    if (!baseInfo) {
      return <Loader />;
    }

    return (
      <div className="div-entity-info-pane">
        <InfoTable title="Basic Info" dataMap={baseInfo} />
        <InfoTable title="Parent Regions" dataMap={parentEntityInfo} />
        <InfoTable title="Alternative Region Codes" dataMap={customInfo} />
        <InfoTable title="Related Regions" dataMap={relatedEntityInfo} />
      </div>
    )
  }
}
