import React, {Component} from 'react';

import locationIcon from './icon_location.png';

export default class LocationIcon extends Component {
  render() {
    const iconSize = 64;
    const style = {
      position: 'absolute',
      left: this.props.width / 2 - iconSize / 2,
      top: this.props.height / 2 - iconSize / 2,
      width: iconSize,
      height: iconSize,
    }

    return (
      <img
        className='img-location'
        src={locationIcon}
        alt="location"
        style={style}
      />
    )
  }
}
