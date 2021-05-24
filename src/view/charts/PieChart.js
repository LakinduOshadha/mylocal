import {Component} from 'react';
import MathX from 'model/MathX.js';
import './PieChart.css';

const FIELD_NAME_TO_COLOR = {
  'bharatha': 'hsl(21, 100%, 80%)',
  'burgher': 'purple',
  'chetty': 'hsl(21, 100%, 70%)',
  'indian_tamil': 'hsl(21, 100%, 60%)',
  'malay': 'hsl(165, 100%, 34%)',
  'moor': 'hsl(165, 100%, 17%)',
  'other': 'ghostwhite',
  'sinhalese': 'hsl(355, 63%, 34%)',
  'sri_lankan_tamil': 'hsl(21, 100%, 50%)',
};

function getFieldNameColor(fieldName) {
  const color = FIELD_NAME_TO_COLOR[fieldName];
  if (color) {
    return color;
  }
  console.debug(`'${fieldName}': 'ghostwhite',`);
  return 'ghostwhite';
}

export default class PieChart extends Component {
  render() {
    const {dataMap} = this.props;
    const [width, height]= [200, 200];
    const [cx, cy] = [width / 2, height / 2];
    const r = Math.min(cx, cy);

    const styleDiv = {width, height}

    const extendedData = Object.entries(Object.values(dataMap)[0]).map(
        function ([fieldName, value]) {
          return [fieldName, value];
        }
    ).filter(
      function ([fieldName, _]) {
        return !fieldName.includes('total_')
          && !fieldName.includes('entity_id') ;
      }
    ).sort(
      function([fieldNameA, valueA], [fieldNameB, valueB]) {
        return valueB - valueA;
      }
    );
    const total = MathX.sum(extendedData.map(([fieldName, value]) => value));

    let runningTotal = 0;
    const renderedArcs = extendedData.map(
      function([fieldName, value]) {
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
          <path d={d} fill={fill}/>
        )
      }
    )

    return (
      <div className="div-pie-chart" style={styleDiv}>
        <svg width={width} height={height}>
          <circle cx={cx} cy={cy} r={r} />
          {renderedArcs}
        </svg>
      </div>
    )
  }
}
