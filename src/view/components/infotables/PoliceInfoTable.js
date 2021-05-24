import React from 'react';
import {Link} from "react-router-dom";
import * as d3 from 'd3';

import GIGServer from 'model/GIGServer.js';
import AbstractInfoTable
  from './AbstractInfoTable.js';

import './AbstractInfoTable.css';

const N_NEARBY_ITEMS = 3;

export default class PoliceInfobox extends AbstractInfoTable {
  getTitle() {
    return 'Police Stations';
  }

  renderRow(data) {
    return (
      <tr>
        <td className="align-left">
          {data.content}
        </td>
      </tr>
    )
  }

  async getDataList() {
    const {latLng} = this.props;
    const nearbyPlaces = await GIGServer.getNearby(latLng);

    return nearbyPlaces.slice(0, N_NEARBY_ITEMS).map(
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
