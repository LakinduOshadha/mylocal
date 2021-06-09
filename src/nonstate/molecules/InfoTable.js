import React, {Component} from 'react';
import Reference from 'nonstate/atoms/Reference.js';

import './InfoTable.css';

export default class InfoTable extends Component {

  renderRow([label, content], iRow) {
    const key = `row-${iRow}-${label}`;

    return (
      <tr key={key}>
        <th>{label}</th>
        <td>{content}</td>
      </tr>
    );
  }

  render() {
    const {dataMap, title} = this.props;

    return (
      <div className="div-info-table">
        <h3 className="h3-info-table-title">{title}</h3>
        <table className="table-info-table">
          <tbody>
            {Object.entries(dataMap).map(this.renderRow)}
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
