import * as db from "../DataBase";

const tableName = "DestinosIngreso";

export function _createTable(tx) {
  var query = "CREATE TABLE " + tableName + " (" +
  "id INTEGER PRIMARY KEY," +
  "destinoIngreso VARCHAR(255))";

  db._createTable(tx, tableName, query, () => {
    _populateTable(tx);
  });
}

export function _dropTable(tx) {
  db._dropTable(tx, tableName);
}

export function _populateTable(tx) {
  _insertTx(tx, { id: 1, desc: "Cuenta Bancaria" });
  _insertTx(tx, { id: 2, desc: "Efectivo" });
}

export function _insertTx(tx, obj) {

  var query = "INSERT INTO " + tableName + " (id, destinoIngreso)" + " VALUES (?, ?)";
  var params = [obj.id, obj.desc];

  db._insertTx(tx, query, params);
}

export function _selectAll(successCallback, errorCallback) {
  db._selectAll(tableName, successCallback, errorCallback);
}