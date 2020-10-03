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

export function _selectAllByIdUsuario(idUsuario, successCallback, errorCallback) {
  db._selectAllByIdUsuario(tableName, idUsuario, successCallback, errorCallback);
}

export function _selectAllByIdUsuarioPromise(idUsuario) {
  return db._selectAllByIdUsuarioPromise(tableName, idUsuario);
}

export function _deleteAllByIdUsuarioPromise(idUsuario) {
  return db._deleteAllByIdUsuarioPromise(tableName, idUsuario);
}

export function _getListado(idUsuario, from, to, successCallback, errorCallback){

  var query = "SELECT presupuesto.id, " +
  " presupuesto.idCategoriaEgreso, " +
  " tipo.categoriaEgreso, " +
  " presupuesto.fechaInicio, " +
  " presupuesto.monto " +
  " FROM " + tableName + " as presupuesto " +
  " INNER JOIN CategoriasEgreso tipo ON presupuesto.idCategoriaEgreso = tipo.id " +
  " WHERE presupuesto.idUsuario = ? " +
  " AND presupuesto.fechaInicio BETWEEN ? AND ? ";

  var params = [idUsuario, from, to];

  db._select(query, params, successCallback, errorCallback);
}

export function _selectById(id, successCallback, errorCallback) {
  db._selectById(tableName, id, successCallback, errorCallback);
}

export function _deleteById(id, successCallback, errorCallback) {
  db._deleteById(tableName, id, successCallback, errorCallback);
}

export function _insert(obj, successCallback, errorCallback) {
  
  var query =
    "INSERT INTO " +
    tableName +
    "(idUsuario, fechaInicio, monto, idCategoriaEgreso) " +
    "VALUES (?, ?, ?, ?)";

  var params = [
    obj.idUsuario,
    obj.fechaInicio,
    obj.monto,
    obj.idCategoriaEgreso
  ];

  db._insert(query, params, successCallback, errorCallback);
}

export function _insertPromise(tx, obj) {
  var query =
    "INSERT INTO " +
    tableName +
    "(idUsuario, fechaInicio, monto, idCategoriaEgreso) " +
    "VALUES (?, ?, ?, ?)";

    var params = [
      obj.idUsuario,
      obj.fechaInicio,
      obj.monto,
      obj.idCategoriaEgreso
    ];

  return db._insertPromise(tx, query, params);
}

