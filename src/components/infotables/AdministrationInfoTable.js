import {Link} from "react-router-dom";

import GeoServer from '../../model/GeoServer.js';
import GIGServer from '../../model/GIGServer.js';
import AbstractInfoTable
  from '../../components/infotables/AbstractInfoTable.js';

import EntityLink
  from '../../components/EntityLink.js';

import './AbstractInfoTable.css';

export default class AdministrationInfoTable extends AbstractInfoTable {
  getTitle() {
    return 'Administration';
  }
  async getDataList() {
    const {latLng} = this.props;

    const {
      province: provinceID,
      district: districtID,
      dsd: dsdID,
      gnd: gndID,
    } = await GeoServer.getRegionInfo(latLng);

    return [
      ['Province', provinceID],
      ['District', districtID],
      ['Divisional Secretariat Division', dsdID],
      ['Drama Niladhari Division', gndID],
    ].map(
      function([entityLabel, entityID]) {
        return {
          label: entityLabel,
          content: <EntityLink entityID={entityID} />,
        };
      },
    )
  }
}
