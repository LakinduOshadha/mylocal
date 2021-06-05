import {Component} from 'react';
import GIGServer from 'core/GIGServer.js';
import {
  getCensusLabel,
  CENSUS_TABLE_SPAN_INFO,
} from 'core/Census.js';
import PieChart from 'stateless/molecules/PieChart.js';
import Pyramid from 'stateless/molecules/Pyramid.js';
import Reference from 'stateless/atoms/Reference.js';
import CensusDescription from 'stateless/atoms/CensusDescription.js';

import './Census.css';

export default class CensusInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {dataMap: undefined};
  }

  async componentDidMount() {
    const {tableName, entity} = this.props;
    const dataMap = await GIGServer.getCensus(tableName, entity.id);
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
      <div key={`div-census-info-${iTable}-${tableName}`}>
        <h3>{getCensusLabel(tableName)}</h3>
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
