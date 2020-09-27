import * as db from "../DataBase";

const tableName = "CategoriasIngreso";

export function _createTable() {
  var query = "CREATE TABLE " + tableName + " (" +
  "id INTEGER PRIMARY KEY," +
  "categoriaIngreso VARCHAR(255))";

  db._createTable(tableName, query, () => {
    _populateTable();
  });
}

export function _dropTable() {
  db._dropTable(tableName);
}

export function _populateTable() {
  _insert({ id: 1, desc: "Alquiler" });
  _insert({ id: 2, desc: "Sueldo" });
  _insert({ id: 3, desc: "Facturación" });
}

export function _insert(obj, successCallback, errorCallback) {

  var query = "INSERT INTO " + tableName + " (id, categoriaIngreso)" + " VALUES (?, ?)";
  var params = [obj.id, obj.desc];

  db._insert(query, params, successCallback, errorCallback);
}

export function _selectAll(successCallback, errorCallback) {
  db._selectAll(tableName, successCallback, errorCallback);
}