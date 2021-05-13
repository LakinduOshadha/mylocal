import GIGServer from '../model/GIGServer.js';

import PageView, {DEFAULT_ZOOM} from '../pages/PageView.js';
import PlaceInfobox from '../components/PlaceInfobox.js';

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
    const {entityType, entityID} = this.props.match.params;
    return (
      <PlaceInfobox entityType={entityType} entityID={entityID}/>
    );
  }
}
