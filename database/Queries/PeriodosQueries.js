import * as db from "../DataBase";

const tableName = "Periodos";

export function _createTable() {
  var query = "CREATE TABLE " + tableName + " (" +
  "id INTEGER PRIMARY KEY," +
  "periodo VARCHAR(255))";

  db._createTable(tableName, query, () => {
    _populateTable();
  });
}

export function _dropTable() {
  db._dropTable(tableName);
}

export function _populateTable() {
  _insert({ id: 1, desc: "Semanal" });
  _insert({ id: 2, desc: "Mensual" });
  _insert({ id: 3, desc: "Anual" });  
}

export function _insert(obj, successCallback, errorCallback) {

  var query = "INSERT INTO " + tableName + " (id, banco)" + " VALUES (?, ?)";
  var params = [obj.id, obj.desc];

  db._insert(query, params, successCallback, errorCallback);
}

export function _selectAll(successCallback, errorCallback) {
  db._selectAll(tableName, successCallback, errorCallback);
}