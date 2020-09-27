import * as db from "../DataBase";

const tableName = "Usuarios";

export function _createTable(tx, successCallback, errorCallback) {
  var query =
    "CREATE TABLE " +
    tableName +
    " (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "email VARCHAR(150)," +
    "nombre VARCHAR(100)," +
    "apellido VARCHAR(100)," +
    "password VARCHAR(50))";

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
  db._deleteById(id, successCallback, errorCallback);
}

export function _login(obj, successCallback, errorCallback) {
  var query =
    "SELECT * " +
    " FROM " +
    tableName +
    " WHERE UPPER(email) = ? " +
    " AND password = ?";

  var params = [obj.email.toUpperCase(), obj.password];

  db._select(query, params, successCallback, errorCallback);
}

export function _insertTx(tx, obj) {

  var query =
    "INSERT INTO " +
    tableName +
    "(email, nombre, apellido, password) " +
    "VALUES (?, ?, ?, ?)";
    var params = [obj.email, obj.nombre, obj.apellido, obj.password];

  db._insertTx(tx, query, params);
}

export function _insert(obj, successCallback, errorCallback) {
  var query =
    "INSERT INTO " +
    tableName +
    "(email, nombre, apellido, password) " +
    "VALUES (?, ?, ?, ?)";

  var params = [obj.email, obj.nombre, obj.apellido, obj.password];

  db._insert(query, params, successCallback, errorCallback);
}

export function _delete(obj, successCallback, errorCallback) {
  var query = "";

  var params = [];

  db._delete(query, params, successCallback, errorCallback);
}