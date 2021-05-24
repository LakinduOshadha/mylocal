import React, {Component} from 'react';

import {getSummary} from 'model/DetailedInfo.js';

import './DetailedInfo.css';

export default class DetailedInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      summary: '',
    };
  }

  // async componentDidMount() {
  //   const {entityID} = this.props;
  //   const {showDetails} = this.state;
  //   if (!showDetails) {
  //     return;
  //   }
  //
  //   const summary = await getSummary(entityID);
  //   this.setState({
  //     summary,
  //   });
  // }

  async onClickShowDetails(e) {
    const {entityID} = this.props;
    const summary = await getSummary(entityID);
    this.setState({summary, showDetails: true});
  }

  render() {
    const {showDetails, summary} = this.state;
    const {entityID} = this.props;

    if (!showDetails) {
      return (
        <div className="div-detailed-info">
          <a
            className="a-show-details"
            onClick={this.onClickShowDetails.bind(this)}
          >
            Click to see details about {entityID}
          </a>
        </div>
      )
    }

    return (
      <div className="div-detailed-info">
        <h1>{entityID}</h1>
        <p>{summary}</p>
      </div>
    )
  }
}
