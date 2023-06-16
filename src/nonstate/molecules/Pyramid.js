import {Component} from 'react';

import MathX from 'base/MathX.js';
import {hsla} from 'core/Color.js';
import Table from './Table.js';

import './Pyramid.css';

export default class Pyramid extends Component {
  render() {
    const {dataMap, tableName, ageKeys} = this.props;
    const innerDataMap = Object.values(dataMap)[0];

    const dataValues = ageKeys.map(k => innerDataMap[k[0]]);
    const totalKeySpan = MathX.sum(ageKeys.map(k => k[1]));
    const total = MathX.sum(dataValues);
    const max = Math.max(...ageKeys.map(k => innerDataMap[k[0]] / k[1]));

    const nData = ageKeys.length;
    const [width, height]= [120, 19 * nData];
    const styleDiv = {width: width * 2, height}

    let tableInfos = [];
    let rollingKeySpan = 0;
    const renderedBars = ageKeys.map(
      function([ageKey, keySpan], iData) {
        const value = innerDataMap[ageKey];
        const fieldName = ageKey;

        const widthBar = width * (value / max) / keySpan;
        const heightBar = height * (keySpan / totalKeySpan);
        const x = width / 2 - widthBar / 2;
        const y = height * rollingKeySpan / totalKeySpan;
        rollingKeySpan += keySpan;

        const fill = hsla(120 * (1 - iData / nData), 80, 50, 1);
        tableInfos.push({
          key: fieldName,
          value: value,
          color: fill,
        })
        
        return (
          <rect
            key={'pyramid-' + iData}
            x={x}
            y={y}
            width={widthBar}
            height={heightBar}
            fill={fill}
          />
        )
      }
    )

    return (
      <div key={'div-' + tableName} className="div-pyramid-outer">
        <div className="div-table">
          {<Table tableInfos={tableInfos} total={total} />}
        </div>
        <div className="div-pyramid" style={styleDiv}>
          <svg className="svg-pyramid" width={width} height={height}>
            {renderedBars}
          </svg>
        </div>
      </div>
    )
  }
}
