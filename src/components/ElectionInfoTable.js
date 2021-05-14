import GeoServer from '../model/GeoServer.js';
import GIGServer from '../model/GIGServer.js';
import AbstractInfoTable from '../components/AbstractInfoTable.js';

export default class ElectionInfoTable extends AbstractInfoTable {
  getTitle() {
    return 'Election';
  }
  async getDataList() {
    const {latLng} = this.props;

    const {
      gnd: gndID,
    } = await GeoServer.getRegionInfo(latLng);

    const gndData = await GIGServer.getEntity(gndID);
    const pdID = gndData['pd_id'];
    const edID = pdID.substring(0, 5);

    const {
        [edID]: edData,
        [pdID]: pdData,
    } = await GIGServer.multigetEntities([
      edID,
      pdID,
    ]);

    return [
      {label: 'Electoral District', content: edData.name},
      {label: 'Polling Division', content:  pdData.name},
    ];
  }
}
