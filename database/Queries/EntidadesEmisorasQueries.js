import * as db from "../DataBase";

const tableName = "EntidadesEmisoras";

export function _createTable(tx) {
  var query = "CREATE TABLE " + tableName + " (" +
  "id INTEGER PRIMARY KEY," +
  "entidadEmisora VARCHAR(255))";

  db._createTable(tx, tableName, query, () => {
    _populateTable(tx);
  });
}

export function _dropTable(tx) {
  db._dropTable(tx, tableName);
}

export function _populateTable(tx) {
  _insertTx(tx, { id: 1, desc: "American Express" });
  _insertTx(tx, { id: 2, desc: "MasterCard" });
  _insertTx(tx, { id: 3, desc: "Visa" });
}

export function _insertTx(tx, obj) {

  var query = "INSERT INTO " + tableName + " (id, entidadEmisora)" + " VALUES (?, ?)";
  var params = [obj.id, obj.desc];

  db._insertTx(tx, query, params);
}

export function _selectAll(successCallback, errorCallback) {
  db._selectAll(tableName, successCallback, errorCallback);
}