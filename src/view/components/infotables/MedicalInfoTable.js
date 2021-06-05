import GeoServer from 'core/GeoServer.js';
import GIGServer from 'core/GIGServer.js';
import AbstractInfoTable from './AbstractInfoTable.js';
import EntityLink from 'stateful/atoms/EntityLink.js';

export default class MedicalInfoTable extends AbstractInfoTable {
  getTitle() {
    return 'Medical Authorities';
  }
  async getDataList() {
    const {latLng} = this.props;

    const {
      gnd: gndID,
    } = await GeoServer.getRegionInfo(latLng);

    const gndData = await GIGServer.getEntity(gndID);
    const mohID = gndData['moh_id'];

    return [
      {
        label: 'Medical Office of Health Area',
        content: (
          <span>
            <EntityLink entityID={mohID} />
            {` MOH`}
          </span>
        ),
      },
    ];
  }
}
