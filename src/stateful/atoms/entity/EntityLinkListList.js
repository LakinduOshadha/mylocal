import EntityLinkList from './EntityLinkList.js';

import './EntityLink.css';

export default function EntityLinkListList(props) {
  const {entityIDListList, ientityIDListList} = props;

  return (
    <div
      key={`div-entity-linkt-list-list-${ientityIDListList}`}
      className="div-entity-link-list-list"
    >
      {entityIDListList.sort().map(
        function(entityIDList, iEntityIDList) {
          return (
            <EntityLinkList
              entityIDList={entityIDList}
              iEntityIDList={iEntityIDList}
            />
          );
        }
      )}
    </div>
  );
}
