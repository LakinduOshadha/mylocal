import CensusInfo from './CensusInfo.js';

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
      <h2>{groupName}</h2>
      {renderedInner}
    </div>
  )
}
