import * as db from "../DataBase";

const tableName = "Inversiones";

export function _createTable(tx) {
  var query = "CREATE TABLE IF NOT EXISTS " + tableName+ " (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT," +
  "idUsuario INTEGER," +
  "idTipo INTEGER," +
  "idCuenta INTEGER," +
  "monto NUMERIC(10, 2)," +
  "fechaInicio DATE," +
  "fechaVencimiento DATE," +
  "nombre VARCHAR(255)," +
  "duracion INTEGER," +
  "FOREIGN KEY(idUsuario) REFERENCES Usuarios(id), " +
  "FOREIGN KEY(idCuenta) REFERENCES Cuentas(id), " +
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
  " banco.banco || ' - ' || cuenta.cbu as cuenta, " +
  " inversion.fechaInicio, " +
  " inversion.fechaVencimiento, " +
  " inversion.nombre, " +
  " inversion.duracion " +
  " FROM " + tableName + " as inversion " +
  " INNER JOIN TiposInversion tipo ON inversion.idTipo = tipo.id " +
  " INNER JOIN Cuentas cuenta ON inversion.idCuenta = cuenta.id " +
  " INNER JOIN Bancos banco ON cuenta.idBanco = banco.id " +
  " WHERE inversion.idUsuario = ? " +
  " AND inversion.fechaInicio BETWEEN ? AND ? ";

  var params = [idUsuario, from, to];

  db._select(query, params, successCallback, errorCallback);
}

export function _getProximosVencimientos(idUsuario, from, to, successCallback, errorCallback){

  var query = "SELECT inversion.id, " +
  " tipo.tipoInversion, " +
  " inversion.monto, " +
  " banco.banco || ' - ' || cuenta.cbu as cuenta, " +
  " inversion.fechaInicio, " +
  " inversion.fechaVencimiento, " +
  " inversion.nombre, " +
  " inversion.duracion " +
  " FROM " + tableName + " as inversion " +
  " INNER JOIN TiposInversion tipo ON inversion.idTipo = tipo.id " +
  " INNER JOIN Cuentas cuenta ON inversion.idCuenta = cuenta.id " +
  " INNER JOIN Bancos banco ON cuenta.idBanco = banco.id " +
  " WHERE inversion.idUsuario = ? " +
  " AND inversion.idTipo = '2' " + 
  " AND inversion.fechaVencimiento BETWEEN ? AND ? ";

  var params = [idUsuario, from, to];

  db._select(query, params, successCallback, errorCallback);
}

export function _insertTx(tx, obj, successCallback, errorCallback) {
  var query =
  "INSERT INTO " +
  tableName + 
    "(idUsuario," +
    " idTipo," +
    " idCuenta," +
    " monto," +
    " fechaInicio," +
    " fechaVencimiento," +
    " nombre," +
    " duracion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  var params = [
    obj.idUsuario,
    obj.idTipo,
    obj.idCuenta,
    obj.monto,
    obj.fechaInicio,
    obj.fechaVencimiento,
    obj.nombre,
    obj.duracion
  ];

  db._insertTx(tx, query, params, successCallback, errorCallback);
}

export function _insert(obj, successCallback, errorCallback) {
  db._createTransaction((tx) => {
    _insertTx(tx, obj, successCallback, errorCallback);
  });
}

