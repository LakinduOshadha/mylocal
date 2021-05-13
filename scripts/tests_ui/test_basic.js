const {Builder, By, until} = require('selenium-webdriver');
const sleep = require('sleep');

// const BASE_URL = 'http://localhost:3000';
// const BASE_URL = 'http://0.0.0.0:8080';

const BASE_URL = 'http://18.209.43.63';
const TIMEOUT_S = 2;

async function testDifferentURLs() {
  const driver = await new Builder().forBrowser('firefox').build();

  const URLS = [
    '/mylocal',
    '/mylocal/admin/LK-1127015',
    '/mylocal/admin/LK-1127',
    '/mylocal/admin/LK-11',
    '/mylocal/admin/LK-1',
    '/mylocal/admin/LK-15',
    '/mylocal/adman/LA',

    '/mylocal/location/6.91N,79.86E,16z',
    '/mylocal/location/6.9N,79.9E,16z',
    '/mylocal/location/6.8N,79.9E,11z',
    '/mylocal/location/7N,80E,11z',

    '/mylocal/place/ps/PS-110323',
  ];

  for (let i in URLS) {
    const url = URLS[i];
    console.debug(`Opening: ${url}`);
    await driver.get(`${BASE_URL}${url}`);
    sleep.sleep(1);

    // const linkWestern = By.linkText("Western")
    // await driver.wait(until.elementLocated(linkWestern), TIMEOUT_S * 1000);
    // console.debug('\tFound Colombo');
    //
    const buttonZoomIn = By.xpath("//button[text()='+']")
    await driver.wait(until.elementLocated(buttonZoomIn), TIMEOUT_S * 1000);
    console.debug('\tFound ZoomIn Button');
  }

  driver.quit();
}

testDifferentURLs();
