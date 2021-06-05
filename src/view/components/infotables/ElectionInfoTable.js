import GeoServer from 'core/GeoServer.js';
import GIGServer from 'core/GIGServer.js';
import AbstractInfoTable from './AbstractInfoTable.js';
import EntityLink from 'stateful/atoms/EntityLink.js';

export default class ElectionInfoTable extends AbstractInfoTable {
  getTitle() {
    return 'Elections';
  }
  async getDataList() {
    const {latLng} = this.props;

    const {
      gnd: gndID,
    } = await GeoServer.getRegionInfo(latLng);

    const gndData = await GIGServer.getEntity(gndID);
    const pdID = gndData['pd_id'];
    const edID = pdID.substring(0, 5);

    return [
      {
        content: (
          <span>
            <EntityLink entityID={pdID} />
            {` PD`}
          </span>
        ),
      },
      {
        content: (
          <span>
            <EntityLink entityID={edID} />
            {` ED`}
          </span>
        ),
    },
    ];
  }
}
