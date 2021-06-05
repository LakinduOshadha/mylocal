import {CENSUS_TABLE_GROUPS} from 'constants/CensusConstants.js';
import CensusInfoGroup from './CensusInfoGroup.js';

export default function CensusInfoGroupList(props) {
  const {entityID} = props;
  return Object.entries(CENSUS_TABLE_GROUPS).map(
    function ([groupName, tableNames], iCensusInfoGroup) {
      const key = `census-info-group-${iCensusInfoGroup}-${groupName}-`;
      return (
        <CensusInfoGroup
          key={key}
          groupName={groupName}
          tableNames={tableNames}
          entityID={entityID}
        />
      );
    }
  );
}
