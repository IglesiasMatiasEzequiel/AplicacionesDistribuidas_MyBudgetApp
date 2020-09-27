import * as db from "../DataBase";

const tableName = "TiposInversion";

export function _createTable(tx) {
  var query = "CREATE TABLE " + tableName + " (" +
  "id INTEGER PRIMARY KEY," +
  "tipoInversion VARCHAR(255))";

  db._createTable(tx, tableName, query, () => {
    _populateTable(tx);
  });
}

export function _dropTable(tx) {
  db._dropTable(tx, tableName);
}

export function _populateTable(tx) {
  _insertTx(tx, { id: 1, desc: "Acciones" });
  _insertTx(tx, { id: 2, desc: "Plazo Fijo" });
  _insertTx(tx, { id: 3, desc: "Fondo Comunes" });
  _insertTx(tx, { id: 4, desc: "Bonos" });
}

export function _insertTx(tx, obj) {

  var query = "INSERT INTO " + tableName + " (id, tipoInversion)" + " VALUES (?, ?)";
  var params = [obj.id, obj.desc];

  db._insertTx(tx, query, params);
}

export function _selectAll(successCallback, errorCallback) {
  db._selectAll(tableName, successCallback, errorCallback);
}