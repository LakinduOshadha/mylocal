export function getBrowserLatLng(callback) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      callback([
        position.coords.latitude,
        position.coords.longitude,
      ]);
    }
  )
}
