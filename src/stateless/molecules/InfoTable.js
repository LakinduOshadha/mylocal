import React, {Component} from 'react';
import Reference from 'stateless/atoms/Reference.js';

export default class InfoTable extends Component {

  renderRow(data, iRow) {
    const key = `row-${iRow}-${data.label}`;

    return (
      <tr key={key}>
        <th>{data.label}</th>
        <td>{data.content}</td>
      </tr>
    );
  }

  render() {
    const {dataTable, title} = this.props;

    return (
      <div className="div-info-table">
        <h3>{title}</h3>
        <table>
          <tbody>
            {dataTable.map(this.renderRow)}
          </tbody>
        </table>
        <Reference
          title="Data Source"
          label="Department of Census and Statistics, Sri Lanka"
          link="http://www.statistics.gov.lk/"
        />
      </div>
    )
  }
}
