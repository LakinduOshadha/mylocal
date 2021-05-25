import {Component} from 'react';
import {getExtendedData} from 'model/DataTable.js';
import {getFieldNameColor} from 'view/Color.js';
import {
  formatPercentAndTotal,
  titleCase,
} from 'view/FormatUtils.js';

import './PieChart.css';

export default class PieChart extends Component {
  render() {
    const {dataMap} = this.props;
    const {extendedData, total} = getExtendedData(dataMap);

    return (
      <table>
        <tbody>
          {extendedData.map(
            function([fieldName, value]) {
              const fill = getFieldNameColor(fieldName);

              return (
                <tr>
                  <td>
                    <svg width="10" heigh="10">
                      <circle cx="5" cy="5" r="5" style={{'fill': fill}} />
                    </svg>
                  </td>
                  <th>{titleCase(fieldName)}</th>
                  <td>
                    <div>
                      {formatPercentAndTotal(value, total)}
                    </div>
                  </td>
                </tr>
              )
            }
          )}
        </tbody>
      </table>
    )
  }
}
