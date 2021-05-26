const md5 = require('md5');
const CACHE_VERSION = 'v2021-05-26';
const CACHE_ENABLED = true;

export async function asyncCacheGet(cacheKey, asyncFallback) {

  if (!CACHE_ENABLED) {
    return await asyncFallback();
  }

  const finalCacheKey = md5(`${CACHE_VERSION}:${cacheKey}`);
  let dataJson = localStorage.getItem(finalCacheKey);

  let data = undefined;
  if (!dataJson) {
    data = await asyncFallback();
    if (data) {
      dataJson = JSON.stringify(data);
      localStorage.setItem(finalCacheKey, dataJson);
    }
  } else {
    data = JSON.parse(dataJson);
  }
  return data;
}
