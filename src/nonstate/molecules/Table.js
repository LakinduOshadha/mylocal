import {Component} from 'react';
import Format from 'nonstate/atoms/Format.js';

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
                      <circle cx="5" cy="9" r="4" style={{'fill': color}} />
                    </svg>
                  </td>
                  <th>{Format.titleCase(key)}</th>
                  <td className="align-right highlight">
                    <div>
                      {valueIsPercent
                          ? Format.percent(value)
                          : Format.percent(value / total)
                      }
                      {}
                    </div>
                  </td>
                  <td className="align-right">
                    <div>
                      {valueIsPercent
                          ? null
                          : Format.numWithComma(value)
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
