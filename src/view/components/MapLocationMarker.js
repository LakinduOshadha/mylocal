import {useState} from 'react';
import {Marker, useMapEvents} from 'react-leaflet';

export default function MapLocationMarker(defaultPosition) {
  const map = useMapEvents({
    click(e) {
      const {lat, lng} = e.latlng;
      const zoom = map.getZoom();
      map.flyTo({lat, lng}, map.getZoom())
      setPosition({lat, lng})
      window.history.pushState('', '', `/location/${lat}N,${lng}E,${zoom}z`);
    },
  })
  console.debug(map.getBounds());
  const [position, setPosition] = useState(map.getCenter());

  return position === null ? null : (
    <Marker position={position} />
  );
}
