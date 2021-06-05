import React, {Component} from 'react';
import Reference from 'stateless/atoms/Reference.js';
import './AbstractInfoTable.css';

export default class AbstractInfoTable extends Component {

  constructor(props) {
    super(props);
    this.state = {dataList: undefined};
  }

  async componentDidMount() {
    this.setState({
        dataList: await this.getDataList(),
    });
  }

  async getDataList(props) {
    return [];
  }

  getTitle() {
    return null;
  }

  renderRow(data, iRow) {
    const key = `row-${iRow}-${data.label}`;
    return (
      <tr key={key}>
        <td className="align-left">
          {data.content}
        </td>
      </tr>
    )
  }

  render() {
    if (!this.state.dataList) {
      return <div>...</div>;
    }

    return (
      <div className="div-info-table">
        <h3>{this.getTitle()}</h3>
        <table>
          <tbody>
            {this.state.dataList.map(this.renderRow)}
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
