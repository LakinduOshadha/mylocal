import React, {Component} from 'react';

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
    const {entity} = this.state;

    let label = entityID;
    let className = 'link-id';
    if (entity) {
        label = entity.name;
        className = 'link-name';
    }

    return (
      <a className={className} href={`/admin/${entityID}`}>
        {label}
      </a>
    )
  }
}
