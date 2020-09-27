import * as db from "../DataBase";

const tableName = "MediosPago";

export function _createTable(tx) {
  var query = "CREATE TABLE " + tableName + " (" +
  "id INTEGER PRIMARY KEY," +
  "medioPago VARCHAR(255))";

  db._createTable(tx, tableName, query, () => {
    _populateTable(tx);
  });
}

export function _dropTable(tx) {
  db._dropTable(tx, tableName);
}

export function _populateTable(tx) {
  _insertTx(tx, { id: 1, desc: "Efectivo" });
  _insertTx(tx, { id: 2, desc: "Tarjeta Crédito" });
  _insertTx(tx, { id: 3, desc: "Tarjeta Débito" });
  _insertTx(tx, { id: 4, desc: "Débito Automático" });
  _insertTx(tx, { id: 5, desc: "Transferencia" });
  _insertTx(tx, { id: 6, desc: "Mercado Pago" });
}

export function _insertTx(tx, obj) {

  var query = "INSERT INTO " + tableName + " (id, medioPago)" + " VALUES (?, ?)";
  var params = [obj.id, obj.desc];

  db._insertTx(tx, query, params);
}

export function _selectAll(successCallback, errorCallback) {
  db._selectAll(tableName, successCallback, errorCallback);
}