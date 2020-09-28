import * as db from "../DataBase";

const tableName = "Presupuestos";

export function _createTable(tx) {
    var query = "CREATE TABLE IF NOT EXISTS " + tableName + " (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "idUsuario INTEGER," +
      "fechaInicio DATE," +
      "monto NUMERIC(10, 2)," +
      "idCategoriaEgreso INTEGER," +
      "FOREIGN KEY(idCategoriaEgreso) REFERENCES CategoriasEgreso(id)," +
      "FOREIGN KEY(idUsuario) REFERENCES Usuarios(id))";
  db._createTable(tx, tableName, query);
}

export function _dropTable(tx) {
  db._dropTable(tx, tableName);
}

export function _selectAll(successCallback, errorCallback) {
  db._selectAll(tableName, successCallback, errorCallback);
}

export function _selectAllByIdUsuario(obj, successCallback, errorCallback) {
  var query =
  "SELECT * " +
  " FROM " +
  tableName +
  " WHERE idUsuario = ? ";

    var params = [obj.idUsuario];

  db._selectAllByIdUsuario(query, params, successCallback, errorCallback);
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
    "(idUsuario, fechaInicio, monto, idCategoriaEgreso) " +
    "VALUES (?, ?, ?, ?)";

  var params = [
    obj.idUsuario,
    obj.fecha,
    obj.monto,
    obj.idCategoriaEgreso
  ];

  db._insert(query, params, successCallback, errorCallback);
}

