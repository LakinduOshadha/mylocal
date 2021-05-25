import MathX from 'model/MathX.js';
const OTHERS_LIMIT = 0.02;

export function getExtendedData(dataMap) {
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
  const total = MathX.sum(extendedDataRaw.map(([fieldName, value]) => value));

  const extendedDataSig = extendedDataRaw.filter(
    function ([_, value]) {
      return value > total * OTHERS_LIMIT;
    }
  )

  const totalSig = MathX.sum(extendedDataSig.map(
      ([fieldName, value]) => value),
  );
  const others = total - totalSig;

  const extendedData = [].concat(extendedDataSig, [
      ['others', others],
  ]);
  return {
    extendedData,
    total,
  }
}
