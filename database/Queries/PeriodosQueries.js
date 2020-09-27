import * as db from "../DataBase";

const tableName = "Periodos";

export function _createTable(tx) {
  var query = "CREATE TABLE " + tableName + " (" +
  "id INTEGER PRIMARY KEY," +
  "periodo VARCHAR(255))";

  db._createTable(tx, tableName, query, () => {
    _populateTable(tx);
  });
}

export function _dropTable(tx) {
  db._dropTable(tx, tableName);
}

export function _populateTable(tx) {
  _insertTx(tx, { id: 1, desc: "Semanal" });
  _insertTx(tx, { id: 2, desc: "Mensual" });
  _insertTx(tx, { id: 3, desc: "Anual" });  
}

export function _insertTx(tx, obj) {

  var query = "INSERT INTO " + tableName + " (id, banco)" + " VALUES (?, ?)";
  var params = [obj.id, obj.desc];

  db._insertTx(tx, query, params);
}

export function _selectAll(successCallback, errorCallback) {
  db._selectAll(tableName, successCallback, errorCallback);
}