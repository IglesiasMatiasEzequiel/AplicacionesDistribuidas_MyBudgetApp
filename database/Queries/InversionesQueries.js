import * as db from "../DataBase";

const tableName = "Inversiones";

export function _createTable(tx) {
  var query = "CREATE TABLE IF NOT EXISTS " + tableName+ " (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT," +
  "idUsuario INTEGER," +
  "idTipo INTEGER," +
  "monto NUMERIC(10, 2)," +
  "origen INTEGER," +
  "fechaInicio DATE," +
  "nombre VARCHAR(255)," +
  "duracion INTEGER," +
  "FOREIGN KEY(idUsuario) REFERENCES Usuarios(id), " +
  "FOREIGN KEY(idTipo) REFERENCES Tipos(id))" ;

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

export function _selectById(id, successCallback, errorCallback) {
  db._selectById(tableName, id, successCallback, errorCallback);
}

export function _deleteById(id, successCallback, errorCallback) {
  db._deleteById(tableName, id, successCallback, errorCallback);
}

export function _getListado(idUsuario, from, to, successCallback, errorCallback){

  var query = "SELECT inversion.id, " +
  " tipo.tipoInversion, " +
  " inversion.monto, " +
  " inversion.origen, " +
  " inversion.fechaInicio, " +
  " inversion.nombre, " +
  " inversion.duracion " +
  " FROM " + tableName + " as inversion " +
  " INNER JOIN TiposInversion tipo ON inversion.idTipo = tipo.id " +
  " WHERE inversion.idUsuario = ? " +
  " AND inversion.fechaInicio BETWEEN ? AND ? ";

  var params = [idUsuario, from, to];

  db._select(query, params, successCallback, errorCallback);
}

export function _insert(obj, successCallback, errorCallback) {
  var query =
  "INSERT INTO " +
  tableName + 
    "(idUsuario," +
    " idTipo," +
    " monto," +
    " origen," +
    " fechaInicio," +
    " nombre," +
    " duracion) VALUES (?, ?, ?, ?, ?, ?, ?)";

  var params = [
    obj.idUsuario,
    obj.idTipo,
    obj.monto,
    obj.origen,
    obj.fechaInicio,
    obj.nombre,
    obj.duracion
  ];

  db._insert(query, params, successCallback, errorCallback);
}

