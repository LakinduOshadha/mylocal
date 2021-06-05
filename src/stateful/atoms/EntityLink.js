import React, {Component} from 'react';

import {ENTITY} from 'core/EntityConstants.js';
import Entity from 'core/Entity.js';
import GIGServer from 'core/GIGServer.js';

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
    const entityType = Entity.getEntityType(entityID)

    if (entityID === 'LK') {
      return 'Sri Lanka';
    }
    const {entity} = this.state;

    let label = entityID;
    let className = 'entity-link ';
    if (entity) {
        label = `${entity.name} ${Entity.getEntityLabelShort(entityType)}`;
        className += 'link-name';
    } else {
      className += 'link-id';
    }

    let pageName = 'admin';
    if (entityType === ENTITY.PS) {
      pageName = 'place';
    }

    return (
      <a className={className} href={`/mylocal/${pageName}/${entityID}`}>
        {label}
      </a>
    )
  }
}
