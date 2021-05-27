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
    let className = 'entity-link ';
    if (entity) {
        const entityType = Entity.getEntityType(entityID)
        label = `${entity.name} ${Entity.getEntityLabelShort(entityType)}`;
        className += 'link-name';
    } else {
      className += 'link-id';
    }

    return (
      <a className={className} href={`/mylocal/admin/${entityID}`}>
        {label}
      </a>
    )
  }
}

export function renderID(id) {
  return (<div><EntityLink entityID={id} /></div>);
}

export function renderIDList(idList) {
  return (<div className="div-id-list">{idList.sort().map(renderID)}</div>)
}

export function renderIDListList(idListList) {
  return (
    <div className="div-id-list-list">
      {idListList.sort().map(renderIDList)}
    </div>
  );
}
