import {Component} from 'react';
import {Link} from "react-router-dom";

import GIGServer from '../model/GIGServer.js';
import Entity, {ENTITY_LABEL_MAP} from '../model/Entity.js';

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
    const label = entity ? entity.name : entityID;
    return (
      <Link to={`/admin/${entityID}`}>
        {label}
      </Link>
    )
  }
}
