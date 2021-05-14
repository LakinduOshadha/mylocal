import {Link} from "react-router-dom";

import GeoServer from '../model/GeoServer.js';
import GIGServer from '../model/GIGServer.js';
import AbstractInfoTable from '../components/AbstractInfoTable.js';

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

    const entityMap = await GIGServer.multigetEntities([
      provinceID,
      districtID,
      dsdID,
      gndID,
    ]);

    return [
      ['Province', provinceID],
      ['District', districtID],
      ['Divisional Secretariat Division', dsdID],
      ['Drama Niladhari Division', gndID],
    ].map(
      function([entityLabel, entityID]) {
        return {
          label: entityLabel,
          content: (
            <Link to={`/admin/${entityID}`}>
              {entityMap[entityID].name}
            </Link>
          ),
        };
      },
    )
  }
}
