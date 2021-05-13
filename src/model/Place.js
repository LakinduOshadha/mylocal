import {PLACE} from '../model/PlaceConstants.js';
import {getIDKey} from '../model/Region.js';
import {getDistance} from '../model/LatLng.js';
import GIGServer from '../model/GIGServer.js';

const EXCLUDE_PLACE_IDS = ['PS-410104', 'PS-450137', 'PS-510102', 'PS-530137', 'PS-410103', 'PS-510109', 'PS-610111', 'PS-820136', 'PS-450133', 'PS-420144', 'PS-230132', 'PS-450134', 'PS-420140', 'PS-510106', 'PS-510111', 'PS-530140', 'PS-530243', 'PS-710106', 'PS-820124', 'PS-430125', 'PS-420145', 'PS-440150', 'PS-530135', 'PS-820137', 'PS-450132', 'PS-620139', 'PS-420139', 'PS-430128', 'PS-420141', 'PS-710119', 'PS-450136', 'PS-530245', 'PS-430120', 'PS-440149', 'PS-230252'];

export function getPlaceType(placeID) {
  const prefix = placeID.split('-')[0].toLowerCase();
  switch(prefix) {
    case PLACE.PS:
      return PLACE.PS;
    default:
      return undefined;
  }
}

export async function getPlaceDataList(placeType) {
  const dataList = (await GIGServer.getEntities(placeType)).entities;
  return dataList.map(
    (d) => ({
      id: d[getIDKey(placeType)],
      name: d.name,
      latLng: [parseFloat(d.lat), parseFloat(d.lng)],
      phone: d.phone_office,
      division: d.division,
    })
  )
}

export async function getPlaceData(placeID) {
  const placeType = getPlaceType(placeID);
  const datumList = await getPlaceDataList(placeType);

  const filteredDatumList = datumList.filter(function(d) {
    return (d.id === placeID);
  });
  if (!filteredDatumList) {
    return undefined;
  }
  return filteredDatumList[0];
}

export async function getAllPlaceDataList() {
  console.debug('getAllPlaceDataList');
  const placeTypes = Object.values(PLACE);
  const allPlaceDataList =  (await Promise.all(placeTypes.map(
    async function(placeType) {
      return await getPlaceDataList(placeType);
    },
  ))).reduce(
    function(allPlaceDataList, placeDataList) {
      return [].concat(allPlaceDataList, placeDataList);
    },
    [],
  );
  console.debug({allPlaceDataList});
  return allPlaceDataList;
}

export async function getNearbyPlaces(latLng, maxNumPlaces=3) {
  console.debug('getNearbyPlaces');

  const places = (
    await getAllPlaceDataList()
  ).filter(
    (d) => !EXCLUDE_PLACE_IDS.includes(d.id),
  ).map(
    (d) => ({
      placeData: d,
      distance: getDistance(d.latLng, latLng)
    })
  ).sort(
    (a, b) => (a.distance - b.distance)
  ).slice(0, maxNumPlaces);
  console.debug({places})
  return places;
}
