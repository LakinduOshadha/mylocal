import WWW from 'base/WWW.js';

const TEST_SIMULATE_NO_SERVER = false;

function gerServerHost() {
  const { REACT_APP_SERVER_HOST } = process.env;
  return REACT_APP_SERVER_HOST;
}

export default class Server {
  static getURL(serverType, cmd, paramsList) {
    const host = gerServerHost();
    return `${host}/${serverType}_server/${cmd}/${paramsList.join('/')}`
  }

  static async run(serverType, cmd, paramsList) {
    if (TEST_SIMULATE_NO_SERVER) {
      return null;
    }
    const url = Server.getURL(serverType, cmd, paramsList);
    const data = await WWW.getJSON(url);
    return data;
  }
}
