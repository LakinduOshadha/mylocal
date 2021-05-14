import {Component} from 'react';
import * as d3 from 'd3';

import {Link} from "react-router-dom";

import {REGION_LABEL} from '../model/RegionConstants.js';
import {getRegionType} from '../model/Region.js';

import './Infobox.css';

export function getRegionInfoItem(regionID, regionData) {
  const regionType = getRegionType(regionID);
  return {
    label: REGION_LABEL[regionType],
    value: regionID.includes('LK-') ? (
      <Link to={`/admin/${regionID}`}>
        {regionData.name}
      </Link>
    ) : regionData.name,
  }
}

export function getPlaceInfoItem(entityType, d, distance) {
  const normalizedDistance = d3.format('.1f')(distance);
  const idKey = `${entityType}_id`;
  const entityID = d[idKey];

  return {
    value: (
      <span>
        <Link to={`/place/${entityType}/${entityID}`}>
          {d.name}
        </Link>
        {` (${normalizedDistance}km)`}
      </span>
    ),
  };
}

export function renderLatLng([lat, lng]) {
  const formatX = d3.format('.5f');
  return `${formatX(lat)}°N, ${formatX(lng)}°E`;
}

function renderInfoItem(infoItem, i) {
  if (!infoItem.value) {
    return (
      <tr key={`table-row-${i}-${infoItem.label}`}>
        <th><h2>{infoItem.label}</h2></th>
        <td></td>
      </tr>
    )
  }
  if (!infoItem.label) {
    return (
      <tr key={`table-row-${i}-${infoItem.label}`}>
        <td>{infoItem.value}</td>
        <td></td>
      </tr>
    )
  }

  return (
    <tr key={`table-row-${i}-${infoItem.label}`}>
      <th>{infoItem.label}</th>
      <td>{infoItem.value}</td>
    </tr>
  )
}

export function renderHeader(headerText) {
  return <tr><th><h3 className="th-header">{headerText}</h3></th></tr>
}

export class Infobox_DEPRECATED extends Component {
  render() {
    const {info, title, subTitle, style} = this.props;

    return (
      <div className="div-infobox" style={style}>
        <div className="div-sub-title">{subTitle}</div>
        <div className="div-title">{title}</div>
        <table className="table-infobox">
          <tbody>
            {info.map(renderInfoItem)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default class Infobox extends Component {
  render() {
    const {title, subTitle} = this.props;

    return (
      <div className="div-infobox">
        <div className="div-sub-title">{subTitle}</div>
        <div className="div-title">{title}</div>
        {this.props.children}
      </div>
    )
  }
}
