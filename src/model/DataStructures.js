export function arrayFlatten(arr) {
  return arr.reduce(
    function(flattenedArr, arrItem) {
      return flattenedArr.concat(arrItem);
    },
    [],
  )
}

export function dictZip(keys, values) {
  return keys.reduce(
    function(dict, key, i) {
      dict[key] = values[i];
      return dict;
    },
    {},
  )
}

export function invertDict(dict) {
  return Object.entries(dict).reduce(
    function(inverseDict, [key, value]) {
      inverseDict[value] = key;
      return inverseDict;
    },
    {},
  )
}

export function indexArrayByKey(arr, funcGetKey) {
  return arr.reduce(
    function(keyToArr, elem) {
      const key = funcGetKey(elem);
      if (!keyToArr[key]) {
        keyToArr[key] = [];
      }
      keyToArr[key].push(elem);
      return keyToArr;
    },
    {},
  )
}
