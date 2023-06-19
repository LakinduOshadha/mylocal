import WWW from 'base/WWW.js';

export const TEST_GIG_SERVER_DISABLED = false;
export const TEST_GEO_SERVER_DISABLED = false;



function gerServerHost() {
  const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;
  return SERVER_HOST;
}

export default class Server {
  static getURL(cmd, paramsList) {
    const host = gerServerHost();
    return `${host}/${cmd}/${paramsList.join('/')}`
  }

  static async run(cmd, paramsList) {

    const url = Server.getURL(cmd, paramsList);
    const data = await WWW.getJSON(url);
    return data;
  }
}
