import {Component} from 'react';

import {
  getRegionType,
  getParentRegionTypes,
  convertRegionID,
} from '../model/Region.js';
import {REGION_LABEL} from '../model/RegionConstants.js';
import GIGServer from '../model/GIGServer.js';

import Infobox, {getRegionInfoItem} from '../components/Infobox.js';

export default class RegionInfobox extends Component {
  async componentDidMount() {
    const {regionID} = this.props;
    const regionType = getRegionType(regionID);

    const regionData = await GIGServer.getEntity(regionType, regionID);

    const parentRegionIDs = getParentRegionTypes(regionType).map(
      parentRegionType => convertRegionID(regionID, parentRegionType)
    );
    const parentRegionInfo = await Promise.all(
      parentRegionIDs.map(
        async function(parentRegionID) {
          const parentRegionData = await GIGServer.getEntity(
            getRegionType(parentRegionID),
            parentRegionID,
          );
          return {
            parentRegionID,
            parentRegionData,
          };
        },
      )
    )


    this.setState({
      regionData,
      parentRegionInfo,
    })
  }

  render() {
    if (!this.state) {
      return <div className="div-region-data-view">Loading...</div>;
    }

    const {regionData, parentRegionInfo} = this.state;
    const {regionID} = this.props;
    const regionType = getRegionType(regionID);

    const info = parentRegionInfo.map(
      function({parentRegionID, parentRegionData}) {
        return getRegionInfoItem(parentRegionID, parentRegionData);
      }
    );

    return (
      <Infobox
        title={regionData.name}
        subTitle={REGION_LABEL[regionType]}
        info={info}
        style={{background: 'rgba(240, 255, 240, 0.8)'}}
      />
    );
  }
}
