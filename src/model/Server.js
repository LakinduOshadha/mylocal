import WWW from '../model/WWW.js';

const SERVER_MODE =  'aws-apache';
const SERVER_CONFIG = {
  'local-apache': {
    HOST:  '0.0.0.0',
    PORT:  8080,
  },
  'aws-apache': {
    HOST:  '18.209.43.63',
    PORT:  80,
  },
}
const {HOST, PORT} = SERVER_CONFIG[SERVER_MODE];
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
