import React, {Component} from 'react';

import Entity from 'model/Entity.js';
import GIGServer from 'model/GIGServer.js';

import './EntityLink.css';

export default class EntityLink extends Component {
  constructor(props) {
    super(props);
    this.state = {entity: undefined};
  }
  async componentDidMount() {
    const entity = await GIGServer.getEntity(this.props.entityID);
    this.setState({entity});
  }

  render() {
    const {entityID} = this.props;
    if (entityID === 'LK') {
      return 'Sri Lanka';
    }
    const {entity} = this.state;

    let label = entityID;
    let className = 'link-id';
    if (entity) {
        const entityType = Entity.getEntityType(entityID)
        label = `${entity.name} ${Entity.getEntityLabelShort(entityType)}`;
        className = 'link-name';
    }

    return (
      <a className={className} href={`/mylocal/admin/${entityID}`}>
        {label}
      </a>
    )
  }
}
