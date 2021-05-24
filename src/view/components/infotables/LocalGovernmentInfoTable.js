import GeoServer from 'model/GeoServer.js';
import GIGServer from 'model/GIGServer.js';
import AbstractInfoTable from './AbstractInfoTable.js';
import EntityLink from 'view/components/EntityLink.js';

export default class LocalGovernmentInfoTable extends AbstractInfoTable {
  getTitle() {
    return 'Local Government';
  }
  async getDataList() {
    const {latLng} = this.props;

    const {
      gnd: gndID,
    } = await GeoServer.getRegionInfo(latLng);

    const gndData = await GIGServer.getEntity(gndID);
    const lgID = gndData['lg_id'];

    return [
      {
        label: 'Local Government',
        content: <EntityLink entityID={lgID} />,
      },
    ];
  }
}
