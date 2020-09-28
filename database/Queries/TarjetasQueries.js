import * as db from "../DataBase";

const tableName = "Tarjetas";

export function _createTable(tx) {
  var query = "CREATE TABLE IF NOT EXISTS " + tableName + " (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT," +
  "idUsuario INTEGER," +
  "idBanco NUMERIC(3)," +
  "IdEntidadEmisora NUMERIC(3)," +
  "tarjeta NUMERIC(4)," +
  "vencimiento DATE," +
  "cierreResumen DATE," +
  "vencimientoResumen DATE," +
  "FOREIGN KEY(idBanco) REFERENCES Bancos(id)," +
  "FOREIGN KEY(idEntidadEmisora) REFERENCES EntidadesEmisoras(id)," +
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
    "(idUsuario, idBanco, IdEntidadEmisora, tarjeta, vencimiento, cierreResumen, vencimientoResumen) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?)";

  var params = [
    obj.idUsuario,
    obj.idBanco,
    obj.idEntidadEmisaora,
    obj.tarjeta,
    obj.vencimiento,
    obj.cierreResumen,
    obj.vencimientoResumen
  ];

  db._insert(query, params, successCallback, errorCallback);
}