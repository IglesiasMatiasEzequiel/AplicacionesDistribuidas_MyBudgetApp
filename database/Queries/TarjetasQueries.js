import * as db from "../DataBase";

const tableName = "Tarjetas";

export function _createTable(tx, successCallback, errorCallback) {
  var query = "CREATE TABLE IF NOT EXISTS " + tableName + " (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT," +
  "idUsuario INTEGER," +
  "idBanco INTEGER," +
  "idEntidadEmisora INTEGER," +
  "tarjeta INTEGER," +
  "vencimiento DATE," +
  "cierreResumen DATE," +
  "vencimientoResumen DATE," +
  "FOREIGN KEY(idBanco) REFERENCES Bancos(id)," +
  "FOREIGN KEY(idEntidadEmisora) REFERENCES EntidadesEmisoras(id)," +
  "FOREIGN KEY(idUsuario) REFERENCES Usuarios(id))";
db._createTable(tx, tableName, query, successCallback, errorCallback);
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

export function _getListado(idUsuario, successCallback, errorCallback){

  var query = "SELECT tarjeta.id, " +
  " banco.banco, " +
  " entidadEmisora.entidadEmisora, " +
  " tarjeta.tarjeta, " +
  " tarjeta.vencimiento, " +
  " tarjeta.cierreResumen, " +
  " tarjeta.vencimientoResumen " +
  " FROM " + tableName + " as tarjeta " +
  " INNER JOIN Bancos banco ON tarjeta.idBanco = banco.id " +
  " INNER JOIN EntidadesEmisoras entidadEmisora ON tarjeta.idEntidadEmisora = entidadEmisora.id " +
  " WHERE tarjeta.idUsuario = ? ";

  var params = [idUsuario];

  db._select(query, params, successCallback, errorCallback);
}

export function _getTarjetasActualizarResumen(idUsuario, today, successCallback, errorCallback){

  var query = "SELECT tarjeta.id, " +
  " banco.banco, " +
  " entidadEmisora.entidadEmisora, " +
  " tarjeta.tarjeta, " +
  " tarjeta.vencimiento, " +
  " tarjeta.cierreResumen, " +
  " tarjeta.vencimientoResumen " +
  " FROM " + tableName + " as tarjeta " +
  " INNER JOIN Bancos banco ON tarjeta.idBanco = banco.id " +
  " INNER JOIN EntidadesEmisoras entidadEmisora ON tarjeta.idEntidadEmisora = entidadEmisora.id " +
  " WHERE tarjeta.idUsuario = ? " + 
  " AND tarjeta.cierreResumen <= ? ";

  var params = [idUsuario, today];

  db._select(query, params, successCallback, errorCallback);
}

export function _insert(obj, successCallback, errorCallback) {
  db._createTransaction((tx) => {
    db._insertTx(tx, obj, successCallback, errorCallback);
  });
}

export function _insertTx(tx, obj, successCallback, errorCallback) {
  
  var query =
    "INSERT INTO " +
    tableName +
    "(idUsuario, idBanco, idEntidadEmisora, tarjeta, vencimiento, cierreResumen, vencimientoResumen) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?)";

  var params = [
    obj.idUsuario,
    obj.idBanco,
    obj.idEntidadEmisora,
    obj.tarjeta,
    obj.vencimiento,
    obj.cierreResumen,
    obj.vencimientoResumen
  ];

  db._insertTx(tx, query, params, successCallback, errorCallback);
}