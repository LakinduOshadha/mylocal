import WWW from './WWW.js';

function getServerPort(serverType) {
  switch(serverType) {
    case 'gig':
      return 81;
    case 'geo':
      return 82;
    default:
      throw Error(`Unknown serverType: ${serverType}`);
  }
}

export default class Server {
  static getURL(serverType, cmd, paramsList) {
    const host = '127.0.0.1';
    const port = getServerPort(serverType);
    return `http://${host}:${port}`
      + `/${cmd}/${paramsList.join('/')}`
  }

  static async run(serverType, cmd, paramsList) {
    const url = Server.getURL(serverType, cmd, paramsList);
    const data = await WWW.getJSON(url);
    return data;
  }
}
