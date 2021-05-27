import {Component} from 'react';

import MathX from 'model/MathX.js';
import {hsla} from 'view/Color.js';
import Table from './Table.js';

import './Pyramid.css';

const AGE_KEYS = [
  'less_than_10',
  '10_19',
  '20_29',
  '30_39',
  '40_49',
  '50_59',
  '60_69',
  '70_79',
  '80_89',
  '90_and_above',
]

export default class Pyramid extends Component {
  render() {
    const {dataMap, tableName} = this.props;
    const innerDataMap = Object.values(dataMap)[0];

    const [width, height]= [300, 400];
    const [cx, cy] = [width / 2, height / 2];
    const r = Math.min(cx, cy);

    const styleDiv = {width: width * 2, height}

    const dataValues = AGE_KEYS.map(k => innerDataMap[k]);
    const total = MathX.sum(dataValues);
    const max = Math.max(...dataValues)

    const nData = AGE_KEYS.length;
    let tableInfos = [];
    const renderedBars = AGE_KEYS.map(
      function(ageKey, iData) {
        const value = innerDataMap[ageKey];
        const fieldName = ageKey;

        const widthBar = width * (value / max);
        const heightBar = height / nData;
        const x = width / 2 - widthBar / 2;
        const y = height * iData / nData;

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
      <div key={'div-' + tableName} className="div-pie-chart-outer">
        <div className="div-pie-chart" style={styleDiv}>
          <svg width={width} height={height}>
            {renderedBars}
          </svg>
        </div>
        <div className="div-table">
          {<Table tableInfos={tableInfos} total={total} />}
        </div>
      </div>
    )
  }
}
