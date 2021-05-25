import {Component} from 'react';
import {getExtendedData} from 'model/DataTable.js';
import {getFieldNameColor} from 'view/Color.js';
import Table from './Table.js';

import './PieChart.css';

export default class PieChart extends Component {
  render() {
    const {dataMap, tableName} = this.props;
    const {extendedData, total} = getExtendedData(dataMap);
    const [width, height]= [200, 200];
    const [cx, cy] = [width / 2, height / 2];
    const r = Math.min(cx, cy);

    const styleDiv = {width: width * 2, height}

    let runningTotal = 0;
    const renderedArcs = extendedData.map(
      function([fieldName, value], iData) {
        const p1 = runningTotal / total;
        runningTotal += value;
        const p2 = runningTotal / total;

        const theta1 = p1 * 2 * Math.PI;
        const x1 = cx + r * Math.sin(theta1);
        const y1 = cy - r * Math.cos(theta1);

        const theta2 = p2 * 2 * Math.PI;
        const x2 = cx + r * Math.sin(theta2);
        const y2 = cy - r * Math.cos(theta2);

        const xAxisRot = 0
        const largeArcFlag = Math.abs(theta2 - theta1) > Math.PI ? 1 : 0;
        const sweepFlag = theta2 > 0 ? 1 : 0;

        const d = [
          `M${cx},${cy}`,
          `L${x1},${y1}`,
          `A${r},${r},${xAxisRot},${largeArcFlag},${sweepFlag},${x2},${y2}`,
          'Z',
        ].join(' ');

        const fill = getFieldNameColor(fieldName);

        return (
          <path key={'pie-chart-' + iData} d={d} fill={fill}/>
        )
      }
    )

    return (
      <div key={'div-' + tableName} className="div-pie-chart-outer">
        <div className="div-pie-chart" style={styleDiv}>
          <svg width={width} height={height}>
            <circle cx={cx} cy={cy} r={r} />
            {renderedArcs}
          </svg>
        </div>
        <div className="div-table">
          {<Table dataMap={dataMap} />}
        </div>
      </div>
    )
  }
}
