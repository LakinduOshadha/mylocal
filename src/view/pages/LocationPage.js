import React from 'react';
import {parseLatLngAndZoom, roundLatLng} from 'model/LatLng.js';

import Infobox from '../components/Infobox.js';
import AdministrationInfoTable
  from '../components/infotables/AdministrationInfoTable.js';
import ElectionInfoTable from '../components/infotables/ElectionInfoTable.js';
import PoliceInfoTable from '../components/infotables/PoliceInfoTable.js';
import MedicalInfoTable from '../components/infotables/MedicalInfoTable.js';
import LocalGovernmentInfoTable
  from '../components/infotables/LocalGovernmentInfoTable.js';

import Page from '../pages/Page.js';

export default class LocationPage extends Page {

  static getDerivedStateFromProps(props, state) {
    return {
      latLngStr: props.match.params.latLngStr,
    };
  }

  onChangeLocation([lat, lng]) {
    console.debug('LocationPage.onChangeLocation', [lat, lng]);
    this.setState({
      latLng: [lat, lng],
    });
  }

  async getLatLngAndZoom() {
    return parseLatLngAndZoom(this.state.latLngStr);
  }

  renderInner() {
    console.debug('LocationPage.renderInner', this.state.latLng);
    const [lat, lng] = roundLatLng(this.state.latLng);

    const title = (
      <a href={`geo:${lat},${lng}`}>
        {`${lat}N, ${lng}E`}
      </a>
    )

    return (
      <div>
        <Infobox subTitle="Location" title={title}>
          <AdministrationInfoTable
            latLng={this.state.latLng}
          />

          <LocalGovernmentInfoTable
            latLng={this.state.latLng}
          />

          <MedicalInfoTable
            latLng={this.state.latLng}
          />

          <PoliceInfoTable
            latLng={this.state.latLng}
          />

          <ElectionInfoTable
            latLng={this.state.latLng}
          />


        </Infobox>

      </div>
    )
  }
}
