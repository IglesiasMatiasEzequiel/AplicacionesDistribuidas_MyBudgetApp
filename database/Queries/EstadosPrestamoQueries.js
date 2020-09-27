import * as db from "../DataBase";

const tableName = "EstadosPrestamo";

export function _createTable(tx) {
  var query = "CREATE TABLE " + tableName + " (" +
  "id INTEGER PRIMARY KEY," +
  "estadoPrestamo VARCHAR(255))";

  db._createTable(tx, tableName, query, () => {
    _populateTable(tx);
  });
}

export function _dropTable(tx) {
  db._dropTable(tx, tableName);
}

export function _populateTable(tx) {
  _insertTx(tx, { id: 1, desc: "Activo" });
  _insertTx(tx, { id: 2, desc: "Vencido" });
}

export function _insertTx(tx, obj) {

  var query = "INSERT INTO " + tableName + " (id, estadoPrestamo)" + " VALUES (?, ?)";
  var params = [obj.id, obj.desc];

  db._insertTx(tx, query, params);
}

export function _selectAll(successCallback, errorCallback) {
  db._selectAll(tableName, successCallback, errorCallback);
}