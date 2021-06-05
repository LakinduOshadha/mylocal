import EntityLink from './EntityLink.js';

import './EntityLink.css';

export default function EntityLinkList(props) {
  const {entityIDList, iEntityIDList} = props;

  return (
    <div
      key={`div-entity-link-list-${iEntityIDList}`}
      className="div-entity-link-list"
    >
      {entityIDList.sort().map(
        function(entityID, iEntityID) {
          return (<EntityLink entityID={entityID} iEntityID={iEntityID}/>);
        }
      )}
    </div>
  );
}
