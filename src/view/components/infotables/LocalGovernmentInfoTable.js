import GeoServer from 'core/GeoServer.js';
import GIGServer from 'core/GIGServer.js';
import AbstractInfoTable from './AbstractInfoTable.js';
import EntityLink from 'stateful/atoms/entity/EntityLink.js';

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
        label: 'Local Authority',
        content: (
          <span>
            <EntityLink entityID={lgID} />
          </span>
        ),
      },
    ];
  }
}
