import EntityLinkList from './EntityLinkList.js';

export default function EntityLinkListList(props) {
  const {entityIDListList, ientityIDListList} = props;

  return (
    <div
      key={`div-entity-linkt-list-list-${ientityIDListList}`}
      className="div-entity-link-list-list"
    >
      {entityIDListList.sort().map(
        function(entityIDList, iEntityIDList) {
          const key = `entity-link-list-${iEntityIDList}`;
          return (
            <EntityLinkList
              key={key}
              entityIDList={entityIDList}
              iEntityIDList={iEntityIDList}
            />
          );
        }
      )}
    </div>
  );
}
