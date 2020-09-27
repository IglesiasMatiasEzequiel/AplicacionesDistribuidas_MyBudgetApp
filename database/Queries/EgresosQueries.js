import * as db from "../DataBase";

const tableName = "Egresos";

export function _createTable() {
  var query = "CREATE TABLE IF NOT EXISTS " + tableName + " (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT," +
  "idUsuario INTEGER," +
  "fecha DATE," +
  "monto NUMERIC(10, 2)," +
  "tipoEgreso INTEGER," +
  "categoriaEgreso INTEGER," +
  "detalleEgreso VARCHAR(100)," +
  "medioPago INTEGER," +
  "cuotas INTEGER," +
  "cuenta INTEGER," +
  "tarjeta INTEGER," +
  "FOREIGN KEY(idUsuario) REFERENCES Usuarios(id))";
  db._createTable(tableName, query);
}

export function _dropTable() {
  db._dropTable(tableName);
}

export function _selectAll(successCallback, errorCallback) {
  db._selectAll(tableName, successCallback, errorCallback);
}

export function _selectAllByIdUsuario(idUsuario, successCallback, errorCallback) {
  db._selectAllByIdUsuario(tableName, idUsuario, successCallback, errorCallback);
}

export function _selectById(id, successCallback, errorCallback) {
  db._selectById(tableName, id, successCallback, errorCallback);
}

export function _deleteById(id, successCallback, errorCallback) {
  db._deleteById(id, successCallback, errorCallback);
}

export function _insert(obj, successCallback, errorCallback) {
  
  var query =
    "INSERT INTO " +
    tableName +
    "(idUsuario, fecha, monto, ipoEgreso, categoriaEgreso, detalleEgreso, medioPago, cuotas, cuenta, tarjeta, ) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  var params = [
    obj.idUsuario,
    obj.fecha,
    obj.monto,
    obj.tipoEgreso,
    obj.categoriaEgreso,
    obj.detalleEgreso,
    obj.medioPago,
    obj.cuotas,
    obj.cuenta,
    obj.tarjeta,
  ];

  db._insert(query, params, successCallback, errorCallback);
}