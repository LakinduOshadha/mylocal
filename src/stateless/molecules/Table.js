import {Component} from 'react';
import Format from 'view/Format.js';

import './Table.css';

export default class PieChart extends Component {
  render() {
    const {tableInfos, total, valueIsPercent} = this.props;

    return (
      <table>
        <tbody>
          {tableInfos.map(
            function({key, value, color}, iRow) {

              return (
                <tr key={`tr-${iRow}-${key}`}>
                  <td>
                    <svg width="10" heigh="10">
                      <circle cx="5" cy="7" r="5" style={{'fill': color}} />
                    </svg>
                  </td>
                  <th>{Format.titleCase(key)}</th>
                  <td className="align-right">
                    <div>
                      {valueIsPercent
                          ? Format.percent(value)
                          : Format.percentAndTotal(value, total)
                      }
                      {}
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
