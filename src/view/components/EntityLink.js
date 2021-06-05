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

export function renderID(id, i) {
  return (
    <div key={`div-id-${i}`}>
      <EntityLink entityID={id} />
    </div>
  );
}

export function renderIDList(idList, i) {
  return (
    <div key={`div-id-list-${i}`} className="div-id-list">
      {idList.sort().map(renderID)}
    </div>
  );
}

export function renderIDListList(idListList, i) {
  return (
    <div key={`div-id-list-list-${i}`} className="div-id-list-list">
      {idListList.sort().map(renderIDList)}
    </div>
  );
}
