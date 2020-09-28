import * as db from "../DataBase";

const tableName = "Cuentas";

export function _createTable(tx) {
  var query = "CREATE TABLE IF NOT EXISTS " + tableName + " (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT," +
  "idUsuario INTEGER, " +
  "idBanco INTEGER, " + 
  "idEntidadEmisora INTEGER, " + 
  "cbu VARCHAR(255), " + 
  "alias VARCHAR(255), " + 
  "descripcion VARCHAR(255), " + 
  "monto NUMERIC(10, 2), " + 
  "tarjeta INTEGER, " + 
  "vencimiento DATE, " + 
  "FOREIGN KEY(idUsuario) REFERENCES Usuarios(id), " +
  "FOREIGN KEY(idBanco) REFERENCES Bancos(id), " +
  "FOREIGN KEY(idEntidadEmisora) REFERENCES EntidadesEmisoras(id))";

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
export function _insert(obj, successCallback, errorCallback) {
  
  var query =
    "INSERT INTO " +
    tableName +
    "(idUsuario, idBanco, IdEntidadEmisora, cbu, alias, descripcion, monto, tarjeta, vencimiento) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  var params = [
    obj.idUsuario,
    obj.IdBanco,
    obj.idEntidadEmisora,
    obj.cbu,
    obj.alias,
    obj.descripcion,
    obj.monto,
    obj.tarjeta,
    obj.vencimiento,
  ];

  db._insert(query, params, successCallback, errorCallback);
}