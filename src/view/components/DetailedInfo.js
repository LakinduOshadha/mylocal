import React, {Component} from 'react';

import {getSummary} from './DetailedInfoUtils.js';
import GIGServer from 'model/GIGServer.js';

import './DetailedInfo.css';

export default class DetailedInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: true,
      summary: '',
    };
  }

  async componentDidMount() {
    const {entityID} = this.props;
    const entity = await GIGServer.getEntity(entityID);
    const summary = await getSummary(entityID);
    this.setState({summary, entity});
  }

  onClickShowDetails(e) {
    this.setState({showDetails: true});
  }

  onClickHideDetails(e) {
    this.setState({showDetails: false});
  }

  render() {
    const {showDetails, summary, entity} = this.state;
    const {entityID} = this.props;

    if (!entity) {
      return '...';
    }

    if (!showDetails) {
      console.debug(entity);
      return (
        <div className="div-detailed-info">
          <div
            className="div-show-details"
            onClick={this.onClickShowDetails.bind(this)}
          >
            Click to see details about {entity.name} ({entity.id})
          </div>
        </div>
      )
    }

    const className = showDetails ? 'show' : 'hide';

    return (
      <div className={`div-detailed-info ${className}`}>
        <div
          className="div-show-details"
          onClick={this.onClickHideDetails.bind(this)}
        >
          Hide
        </div>
        <div className="div-summary-outer">
          {summary}
        </div>
      </div>
    )
  }
}
