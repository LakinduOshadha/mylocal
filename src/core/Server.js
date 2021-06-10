import WWW from 'base/WWW.js';

export const TEST_GIG_SERVER_DISABLED = false;
export const TEST_GEO_SERVER_DISABLED = false;

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
    if (serverType === 'gig' && TEST_GIG_SERVER_DISABLED) {
      return null;
    }
    if (serverType === 'geo' && TEST_GEO_SERVER_DISABLED) {
      return null;
    }

    const url = Server.getURL(serverType, cmd, paramsList);
    const data = await WWW.getJSON(url);
    return data;
  }
}
