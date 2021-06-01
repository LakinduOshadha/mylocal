import {useState} from 'react';
import {useMapEvents} from 'react-leaflet';

export default function MapLocationMarker({onChangeLocation}) {
  const map = useMapEvents({
    click(e) {
      const {lat, lng} = e.latlng;
      map.flyTo({lat, lng}, map.getZoom())
      setPosition({lat, lng})
      onChangeLocation([lat, lng])
    },
  })
  // eslint-disable-next-line
  const [position, setPosition] = useState(map.getCenter());
  return null;
}
