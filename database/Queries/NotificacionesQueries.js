import * as db from "../DataBase";

const tableName = "Notificaciones";

export function _createTable(tx, successCallback, errorCallback) {
  var query =
    "CREATE TABLE IF NOT EXISTS " + tableName + " (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "idUsuario INTEGER, " +
    "titulo VARCHAR(255), " +
    "mensaje VARCHAR(255), " +
    "fecha DATE," +
    "leido BIT, " +
    "FOREIGN KEY(idUsuario) REFERENCES Usuarios(id))";

  db._createTable(tx, tableName, query, successCallback, errorCallback);
}

export function _dropTable(tx) {
  db._dropTable(tx, tableName);
}

export function _count(successCallback, errorCallback) {
  db._count(tableName, successCallback, errorCallback);
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
  db._deleteById(tableName, id, successCallback, errorCallback);
}

export function _insert(obj, successCallback, errorCallback) {
  db._createTransaction((tx) => {
    db._insertTx(tx, obj, successCallback, errorCallback);
  });
}

export function _getListado(idUsuario, successCallback, errorCallback){

  var query = "SELECT notificacion.id, " +
  " notificacion.titulo, " +
  " notificacion.mensaje, " +
  " notificacion.fecha, " +
  " notificacion.leido " +
  " FROM " + tableName + " as notificacion " +
  " WHERE notificacion.idUsuario = ? " + 
  " ORDER BY notificacion.fecha DESC, notificacion.leido ASC";

  var params = [idUsuario];

  db._select(query, params, successCallback, errorCallback);
}

export function _isNotify(idUsuario, successCallback, errorCallback){

  var query = "SELECT COUNT(1) as cantidad FROM " + tableName + " WHERE idUsuario = ? AND leido = 0";
  var params = [idUsuario];

  db._select(query, params, successCallback, errorCallback);
}

export function _insertTx(tx, obj, successCallback, errorCallback) {

  var query =
    "INSERT INTO " +
    tableName +
    "(idUsuario, titulo, mensaje, fecha, leido) " +
    "VALUES (?, ?, ?, ?, ?)";

    var params = [
      obj.idUsuario,
      obj.titulo,
      obj.mensaje,
      obj.fecha,
      obj.leido
    ];

  db._insertTx(tx, query, params, successCallback, errorCallback);
}

export function _updateMarcarLeidos(idUsuario, successCallback, errorCallback) {
  
  var query =
    "UPDATE " + tableName +
    " SET leido = 1 " +
    " WHERE idUsuario = ?";

  var params = [idUsuario];

  db._update(query, params, successCallback, errorCallback);
}
