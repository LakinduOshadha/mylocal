import React, {Component} from 'react';

import './ZoomerView.css';

export default class ZoomerView extends Component {
  render() {
    return (
      <div className="div-zoomer-view">
        <div>
          <button
            onClick={this.props.onClickZoomIn}
            disabled={this.props.disableZoomIn}
          >
            +
          </button>
        </div>
        <div>
          <button
            onClick={this.props.onClickZoomOut}
            disabled={this.props.disableZoomOut}
          >
            -
          </button>
        </div>
        <div>
          <button
            onClick={this.props.onClickZoomLocation}
          >
            ⌖
          </button>
        </div>
      </div>
    )
  }
}
