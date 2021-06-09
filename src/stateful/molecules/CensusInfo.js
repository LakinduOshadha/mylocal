import {Component} from 'react';
import GIGServer from 'core/GIGServer.js';
import {CENSUS_TABLE_SPAN_INFO} from 'constants/CensusConstants.js';
import {getCensusLabel} from 'core/Census.js';
import PieChart from 'nonstate/molecules/PieChart.js';
import Pyramid from 'nonstate/molecules/Pyramid.js';
import Reference from 'nonstate/atoms/Reference.js';
import CensusDescription from 'nonstate/atoms/CensusDescription.js';

import './CensusInfo.css';

export default class CensusInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {dataMap: undefined};
  }

  async componentDidMount() {
    const {tableName, entityID} = this.props;
    const dataMap = await GIGServer.getCensus(tableName, entityID);
    this.setState({dataMap});
  }

  render() {
    if (!this.state?.dataMap) {
      return '...';
    }
    return this.renderWithData();
  }

  renderWithData() {
    const {tableName, iTable} = this.props;
    const {dataMap} = this.state;

    let ChartComponent;
    if (CENSUS_TABLE_SPAN_INFO[tableName]) {
        ChartComponent = Pyramid;
    } else {
        ChartComponent = PieChart;
    }

    const valueIsPercent =
      (tableName === 'communication_items_owned_by_household');

    return (
      <div
        key={`div-census-info-${iTable}-${tableName}`}
        className="div-census-info"
      >
        <h4>{getCensusLabel(tableName)}</h4>
        {valueIsPercent ? null : <CensusDescription dataMap={dataMap} />}
        <div className="div-census-chart-component">
          <ChartComponent
            dataMap={dataMap}
            tableName={tableName}
            ageKeys={CENSUS_TABLE_SPAN_INFO[tableName]}
            valueIsPercent={valueIsPercent}
          />
        </div>
        <Reference
          title="Data Source"
          label="Department of Census and Statistics, Sri Lanka"
          link="http://www.statistics.gov.lk/"
        />
      </div>
    );
  }
}
