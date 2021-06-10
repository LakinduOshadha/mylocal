const md5 = require('md5');
const CACHE_VERSION = 'v2021-06-05.1543';
const TEST_CACHE_DISABLED = false;

export async function asyncCacheGet(cacheKey, asyncFallback) {

  if (TEST_CACHE_DISABLED) {
    return await asyncFallback();
  }

  const finalCacheKey = md5(`${CACHE_VERSION}:${cacheKey}`);
  let dataJson = localStorage.getItem(finalCacheKey);

  let data = undefined;
  if (!dataJson) {
    data = await asyncFallback();
    if (data) {
      dataJson = JSON.stringify(data);
      try {
        localStorage.setItem(finalCacheKey, dataJson);
      } catch {
        localStorage.clear();
        localStorage.setItem(finalCacheKey, dataJson);
      }

    }
  } else {
    data = JSON.parse(dataJson);
  }
  return data;
}
