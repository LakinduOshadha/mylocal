import React, {Component} from 'react';

import './Infobox.css';

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
