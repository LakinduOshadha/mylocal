import MathX from 'model/MathX.js';
const DEFAULT_OTHERS_LIMIT = 0.0000005;

export function getExtendedData(dataMap, valueIsPercent=false) {
  const extendedDataRaw = Object.entries(Object.values(dataMap)[0]).map(
      function ([fieldName, value]) {
        return [fieldName, value];
      }
  ).filter(
    function ([fieldName, _]) {
      return !fieldName.includes('total_')
        && !fieldName.includes('entity_id') ;
    }
  ).sort(
    function([fieldNameA, valueA], [fieldNameB, valueB]) {
      return valueB - valueA;
    }
  );

  const total = (valueIsPercent) ? 1: MathX.sum(
    extendedDataRaw.map(([fieldName, value]) => value)
  );

  const extendedDataSig = extendedDataRaw.filter(
    function ([label, value]) {
      return (value > total * DEFAULT_OTHERS_LIMIT) && (label !== 'other');
    }
  )

  const totalSig = MathX.sum(extendedDataSig.map(
      ([fieldName, value]) => value),
  );
  const others = valueIsPercent ? 0 : (total - totalSig);

  let extendedData = extendedDataSig;
  if (others) {
    extendedData.push(['others', others]);
  }
  return {
    extendedData,
    total,
  }
}
