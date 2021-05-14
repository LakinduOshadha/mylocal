import {Link} from "react-router-dom";
import * as d3 from 'd3';

import GIGServer from '../../model/GIGServer.js';
import AbstractInfoTable
  from '../../components/infotables/AbstractInfoTable.js';

import './AbstractInfoTable.css';

export default class PoliceInfobox extends AbstractInfoTable {
  getTitle() {
    return 'Police';
  }

  renderRow(data) {
    return (
      <tr>
        <td>
          {data.content}
        </td>
      </tr>
    )
  }

  async getDataList() {
    const {latLng} = this.props;
    const nearbyPlaces = await GIGServer.getNearby(latLng);

    return nearbyPlaces.map(
      function(nearbyPlace) {
        const normalizedDistance = d3.format('.1f')(nearbyPlace.distance);

        return {
          label: nearbyPlace.entity.name,
          content: (
            <>
              <Link to={`/place/${nearbyPlace.entity.ps_id}`}>
                {nearbyPlace.entity.name}
              </Link>
              {` (${normalizedDistance}km)`}
            </>
          ),
        };
      },
    )
  }
}
