import {CENSUS_TABLE_GROUPS} from 'core/Census.js';
import CensusInfoGroup from './CensusInfoGroup.js';

export default function CensusInfoGroupList(props) {
  const {entityID} = props;
  return Object.entries(CENSUS_TABLE_GROUPS).map(
    function ([groupName, tableNames]) {
      return (
        <CensusInfoGroup
          groupName={groupName}
          tableNames={tableNames}
          entityID={entityID}
        />
      );
    }
  );
}
