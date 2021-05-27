import {Component} from 'react';
import {
  formatPercentAndTotal,
  titleCase,
} from 'view/FormatUtils.js';

import './Table.css';

export default class PieChart extends Component {
  render() {
    const {tableInfos, total} = this.props;

    return (
      <table>
        <tbody>
          {tableInfos.map(
            function({key, value, color}, iRow) {

              return (
                <tr key={`tr-${iRow}-${key}`}>
                  <td>
                    <svg width="10" heigh="10">
                      <circle cx="5" cy="10" r="5" style={{'fill': color}} />
                    </svg>
                  </td>
                  <th>{titleCase(key)}</th>
                  <td className="align-right">
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
