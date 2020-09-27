import * as db from "../DataBase";

const tableName = "MediosPago";

export function _createTable() {
  var query = "CREATE TABLE " + tableName + " (" +
  "id INTEGER PRIMARY KEY," +
  "medioPago VARCHAR(255))";

  db._createTable(tableName, query, () => {
    _populateTable();
  });
}

export function _dropTable() {
  db._dropTable(tableName);
}

export function _populateTable() {
  _insert({ id: 1, desc: "Efectivo" });
  _insert({ id: 2, desc: "Tarjeta Crédito" });
  _insert({ id: 3, desc: "Tarjeta Débito" });
  _insert({ id: 4, desc: "Débito Automático" });
  _insert({ id: 5, desc: "Transferencia" });
  _insert({ id: 6, desc: "Mercado Pago" });
}

export function _insert(obj, successCallback, errorCallback) {

  var query = "INSERT INTO " + tableName + " (id, medioPago)" + " VALUES (?, ?)";
  var params = [obj.id, obj.desc];

  db._insert(query, params, successCallback, errorCallback);
}

export function _selectAll(successCallback, errorCallback) {
  db._selectAll(tableName, successCallback, errorCallback);
}