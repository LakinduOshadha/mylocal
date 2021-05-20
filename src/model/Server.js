import WWW from '../model/WWW.js';

const HOST = process.env.REACT_APP_SERVER_HOST;
const PORT = parseInt(process.env.REACT_APP_SERVER_PORT);

const URL_BASE = `http://${HOST}:${PORT}`

export default class Server {
  static getURL(serverType, cmd, paramsList) {
    return URL_BASE
      + `/${serverType}_server/`
      + `${cmd}/${paramsList.join('/')}`
  }

  static async run(serverType, cmd, paramsList) {
    return await WWW.getJSON(Server.getURL(serverType, cmd, paramsList));
  }
}
