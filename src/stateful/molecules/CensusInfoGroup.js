import CensusInfo from './CensusInfo.js';
import './CensusInfoGroup.css';

export default function CensusInfoGroup(props) {
  const {groupName, tableNames, entityID} = props;
  const renderedInner = tableNames.map(
    function (tableName, iTable) {
      const key = `census-info-${iTable}-${tableName}-`;
      return (
        <CensusInfo
          key={key}
          tableName={tableName}
          entityID={entityID}
          iTable={iTable}
        />
      );
    }
  );

  return (
    <div>
      <h3 className="h3-census-group-name">{groupName}</h3>
      {renderedInner}
    </div>
  )
}
