import * as db from "../DataBase";

const tableName = "DestinosIngreso";

export function _createTable() {
  var query = "CREATE TABLE " + tableName + " (" +
  "id INTEGER PRIMARY KEY," +
  "destinoIngreso VARCHAR(255))";

  db._createTable(tableName, query, () => {
    _populateTable();
  });
}

export function _dropTable() {
  db._dropTable(tableName);
}

export function _populateTable() {
  _insert({ id: 1, desc: "Cuenta Bancaria" });
  _insert({ id: 2, desc: "Efectivo" });
}

export function _insert(obj, successCallback, errorCallback) {

  var query = "INSERT INTO " + tableName + " (id, destinoIngreso)" + " VALUES (?, ?)";
  var params = [obj.id, obj.desc];

  db._insert(query, params, successCallback, errorCallback);
}

export function _selectAll(successCallback, errorCallback) {
  db._selectAll(tableName, successCallback, errorCallback);
}