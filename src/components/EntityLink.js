import {Component} from 'react';
import {Link} from "react-router-dom";

export default class EntityLink extends Component {

  render() {
    return (
      <Link to={`/admin/${this.props.entityID}`}>
        {this.props.entityID}
      </Link>
    )
  }
}
