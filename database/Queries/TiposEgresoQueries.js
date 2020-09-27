import * as db from "../DataBase";

const tableName = "TiposEgreso";

export function _createTable() {
  var query = "CREATE TABLE " + tableName + " (" +
  "id INTEGER PRIMARY KEY," +
  "tipoEgreso VARCHAR(255))";

  db._createTable(tableName, query, () => {
    _populateTable();
  });
}

export function _dropTable() {
  db._dropTable(tableName);
}

export function _populateTable() {
  _insert({ id: 1, desc: "Periódico Mensual" });
  _insert({ id: 2, desc: "Extraordinario" });
}

export function _insert(obj, successCallback, errorCallback) {

  var query = "INSERT INTO " + tableName + " (id, tipoEgreso)" + " VALUES (?, ?)";
  var params = [obj.id, obj.desc];

  db._insert(query, params, successCallback, errorCallback);
}

export function _selectAll(successCallback, errorCallback) {
  db._selectAll(tableName, successCallback, errorCallback);
}