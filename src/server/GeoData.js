import EntTypes from "./EntTypes.js";
import WWW from "./WWW.js";
import {ENTITY} from 'constants/EntityConstants.js';
import * as turf from 'turf';
import Ents from "./Ents.js";

const ENT_URL_BASE = process.env.REACT_APP_ENT_URL_BASE;

export default class GeoData {
  static async getGeoForRegionID(regionID) {
    const regionType = EntTypes.getEntType(regionID);
    const url = ENT_URL_BASE + `/geo/json/${regionType}/${regionID}.json`;
    return [await WWW.json(url)];
  }

  static async latlngToRegion([lat, lng]) {

    const regionID = await GeoData.getLatLangRegion([lat, lng], ENTITY.GND)
    const regionIDs = await GeoData.getRegionIDsFromGndID(regionID)

    return regionIDs
  }
  static async getRegionIDsFromGndID(gndID) {
    const gndEnt = await Ents.getEnt(gndID)

    const regionIDs = {
      [ENTITY.PROVINCE] : gndEnt[`${ENTITY.PROVINCE}_id`],
      [ENTITY.DISTRICT] : gndEnt[`${ENTITY.DISTRICT}_id`],
      [ENTITY.DSD] : gndEnt[`${ENTITY.DSD}_id`], 
      [ENTITY.GND] : gndEnt[`${ENTITY.GND}_id`]
    }
    return regionIDs
  }

  static async getGeoForRegionType(regionType) {
    // Get region to geo index
    var allGeoData = await GeoData.getAllGeodata(regionType);
    var geoData = {}
    
    allGeoData.objects.data.geometries.forEach((geometry) =>{
      var coordinates = []
      geometry.arcs.forEach((arc) => {
        arc = arc.shift()
        coordinates.push(allGeoData.arcs[arc])
      })
      geoData[geometry.properties.id] = {
        coordinates: coordinates,
        properties: geometry.properties,
      } 
    })

    return geoData
  }

  static async getAllGeodata(regionType) {
    const fileExt = 'topojson';
    const url = ENT_URL_BASE + `/geo/topo-geo_json/${regionType}.${fileExt}`;
    const allGeoData = await WWW.json(url)
    return allGeoData
  }

  static async getLatLangRegion([lat, lng], regionType) {
    const point = turf.point([lng, lat]); 
    const geoData = await GeoData.getGeoForRegionType(regionType);
    for (const regionID in geoData) {
        const geo = geoData[regionID];
        const multiPolygon = turf.multiPolygon([geo.coordinates], geo.properties);

        if (turf.inside(point, multiPolygon)) {
          return geoData[regionID].properties.id;
        }
    }

    return null;
  }
}
