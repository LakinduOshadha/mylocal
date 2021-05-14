import GIGServer from '../model/GIGServer.js';
import Entity, {ENTITY_LABEL_MAP} from '../model/Entity.js';

import PageView, {DEFAULT_ZOOM} from '../pages/PageView.js';
import Infobox from '../components/Infobox.js';
import EntityInfoTable from '../components/infotables/EntityInfoTable.js';

export default class PlacePageView extends PageView {

  async getLatLngAndZoom() {
    const {entityID} = this.props.match.params;
    const zoom = DEFAULT_ZOOM + 1;
    const entity = await GIGServer.getEntity(entityID);
    const latLng = [parseFloat(entity.lat), parseFloat(entity.lng)];

    return {
      latLng,
      zoom,
    };
  }

  renderInner() {
    const {entityID} = this.props.match.params;
    const entityType = Entity.getEntityType(entityID);
    const entityLabel = ENTITY_LABEL_MAP[entityType];
    return (
      <Infobox
        subTitle={entityLabel}
        title={entityID}
      >
        <EntityInfoTable entityID={entityID} />
      </Infobox>
    );
  }
}
