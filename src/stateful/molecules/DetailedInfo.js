import React, {Component} from 'react';

import GIGServer from 'core/GIGServer.js';
import XButton from 'stateless/atoms/XButton.js';
import CensusInfoGroupList from 'stateful/molecules/CensusInfoGroupList.js';

import './DetailedInfo.css';

export default class DetailedInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: true,
      summary: '',
    };
    this.onClickShowDetails = this.onClickShowDetails.bind(this);
    this.onClickHideDetails = this.onClickHideDetails.bind(this);
  }

  async componentDidMount() {
    const {entityID} = this.props;
    const entity = await GIGServer.getEntity(entityID);
    this.setState({entity});
  }

  onClickShowDetails(e) {
    this.setState({showDetails: true});
  }

  onClickHideDetails(e) {
    this.setState({showDetails: false});
  }

  render() {
    const {showDetails, entity} = this.state;

    if (!entity) {
      return '...';
    }

    if (!showDetails) {
      return (
        <div className="div-detailed-info">
          <div
            className="div-show-details"
            onClick={this.onClickShowDetails.bind(this)}
          >
            Details about {entity.name} ({entity.id})
          </div>
        </div>
      )
    }

    const className = showDetails ? 'show' : 'hide';

    return (
      <div className={`div-detailed-info ${className}`}>
        <XButton onClick={this.onClickHideDetails}/>
        <div className="div-summary-outer">
          <CensusInfoGroupList entity={entity} />
        </div>
      </div>
    )
  }
}