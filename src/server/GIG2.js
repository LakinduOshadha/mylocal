import WWW from "./WWW.js";

export const DEFAULT_LAYER_TABLE_NAME =
  "government-elections-parliamentary.regions-ec.2020";

const CENSUS_URL_BASE = process.env.REACT_APP_CENSUS_URL_BASE;

export default class GIG2 {
  static async getTable(tableName) {
    const url = `${CENSUS_URL_BASE}/${tableName}.tsv`;
    const dList = await WWW.tsv(url);
    return dList;
  }
}
