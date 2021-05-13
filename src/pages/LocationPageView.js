import {parseLatLngAndZoom} from '../model/LatLng.js';
import LocationInfobox from '../components/LocationInfobox.js';
import PageView from '../pages/PageView.js';

export default class LocationPageView extends PageView {
  async getLatLngAndZoom() {
    return parseLatLngAndZoom(this.props.match.params.latLngStr);
  }

  renderInner() {
    const [lat, lng] = this.state.latLng;

    return (
      <div>
        <LocationInfobox
          key={`LocationInfobox-${lat}-${lng}`}
          latLng={this.state.latLng}
        />
      </div>
    )
  }
}
