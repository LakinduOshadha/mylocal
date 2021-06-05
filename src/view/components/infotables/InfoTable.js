import React, {Component} from 'react';
import Reference from 'stateless/atoms/Reference.js';
import GIGServer from 'core/GIGServer.js';
import Entity from 'core/Entity.js';

import getEntityInfo from 'view/EntityInfo.js';

export default class InfoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {dataList: undefined};
  }

  async componentDidMount() {
    this.setState({
        dataList: await this.getDataList(),
    });
  }

  getTitle() {
    return '';
  }

  renderRow(data, iRow) {
    let classNameCustom = '';
    const key = `row-${iRow}-${data.label}`;

    if (!data.content) {
      return (
        <tr key={key}>
          <th className={classNameCustom}>
            <h3>{data.label}</h3>
          </th>
        </tr>
      );
    }
    return (
      <tr key={key}>
        <th className={classNameCustom}>{data.label}</th>
        <td>{data.content}</td>
      </tr>
    );
  }

  async getDataList() {
    const {entityID} = this.props;
    const entityData = await GIGServer.getEntity(entityID);
    const entityType = Entity.getEntityType(entityID);
    const entityInfo  = await getEntityInfo(entityType, entityData);

    return Object.entries(entityInfo).map(
      function([k, v]) {
        return {
          label: k,
          content: v,
        }
      }
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
