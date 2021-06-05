import EntityLink from 'stateful/atoms/EntityLink.js';

export default function EntityLinkList(props) {
  const {entityIDList, iEntityIDList} = props;

  return (
    <div
      key={`div-entity-link-list-${iEntityIDList}`}
      className="div-entity-link-list"
    >
      {entityIDList.sort().map(
        function(entityID, iEntityID) {
          const key = `entity-link-${iEntityID}-${entityID}`;
          return (
            <EntityLink
              key={key}
              entityID={entityID}
              iEntityID={iEntityID}
            />
          );
        }
      )}
    </div>
  );
}
