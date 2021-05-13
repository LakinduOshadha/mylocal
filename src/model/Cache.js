const md5 = require('md5');
const CACHE_VERSION = 'v20210430';
const CACHE_ENABLED = false;

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
