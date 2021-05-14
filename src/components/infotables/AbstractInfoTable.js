import {Component} from 'react';
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

  renderRow(data) {
    return (
      <tr>
        <th>{data.label}</th>
        <td>{data.content}</td>
      </tr>
    );
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
      </div>
    )
  }
}
