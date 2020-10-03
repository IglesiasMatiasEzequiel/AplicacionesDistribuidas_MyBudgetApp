import * as db from "../DataBase";

const tableName = "Prestamos";

export function _createTable(tx) {
  var query = "CREATE TABLE IF NOT EXISTS " + tableName + " (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT," +
  "idUsuario INTEGER," +
  "idTipo INTEGER," +
  "idCuenta INTEGER," +
  "emisorDestinatario VARCHAR(50)," +
  "monto NUMERIC(10, 2)," +
  "intereses NUMERIC(3, 2)," +
  "cuota INTEGER," +
  "vencimiento DATE," +
  "FOREIGN KEY(idTipo) REFERENCES TipoPrestamos(id)," +
  "FOREIGN KEY(idCuenta) REFERENCES Cuentas(id)," +
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

export function _selectById(id, successCallback, errorCallback) {
  db._selectById(tableName, id, successCallback, errorCallback);
}

export function _deleteById(id, successCallback, errorCallback) {
  db._deleteById(tableName, id, successCallback, errorCallback);
}

export function _deleteAllByIdUsuarioPromise(idUsuario) {
  return db._deleteAllByIdUsuarioPromise(tableName, idUsuario);
}

export function _getListado(idUsuario, successCallback, errorCallback){

  var query = "SELECT prestamo.id, " +
  " tipo.tipoPrestamo, " +
  " prestamo.emisorDestinatario, " +
  " prestamo.monto, " +
  " prestamo.intereses, " +
  " prestamo.cuota, " +
  " prestamo.vencimiento " +
  " FROM " + tableName + " as prestamo " +
  " INNER JOIN TiposPrestamo tipo ON prestamo.idTipo = tipo.id " +
  " WHERE prestamo.idUsuario = ? ";

  var params = [idUsuario];

  db._select(query, params, successCallback, errorCallback);
}

export function _getProximosVencimientos(idUsuario, from, to, successCallback, errorCallback){

  var query = "SELECT prestamo.id, " +
  " tipo.tipoPrestamo, " +
  " prestamo.emisorDestinatario, " +
  " prestamo.monto, " +
  " prestamo.intereses, " +
  " prestamo.cuota, " +
  " prestamo.vencimiento " +
  " FROM " + tableName + " as prestamo " +
  " INNER JOIN TiposPrestamo tipo ON prestamo.idTipo = tipo.id " +
  " WHERE prestamo.idUsuario = ? " +
  " AND prestamo.idTipo = '2' " + 
  " AND prestamo.vencimiento BETWEEN ? AND ? ";

  var params = [idUsuario, from, to];

  db._select(query, params, successCallback, errorCallback);
}

export function _insertTx(tx, obj, successCallback, errorCallback) {
  
  var query =
    "INSERT INTO " +
    tableName +
    "(idUsuario, idTipo, idCuenta, emisorDestinatario, monto, intereses, cuota, vencimiento) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  var params = [
    obj.idUsuario,
    obj.idTipo,
    obj.idCuenta,
    obj.emisorDestinatario,
    obj.monto,
    obj.intereses,
    obj.cuota,
    obj.vencimiento
  ];

  db._insertTx(tx, query, params, successCallback, errorCallback);
}

export function _insertPromise(tx, obj) {
  
  var query =
  "INSERT INTO " +
  tableName +
  "(idUsuario, idTipo, idCuenta, emisorDestinatario, monto, intereses, cuota, vencimiento) " +
  "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
   
  var params = [
    obj.idUsuario,
    obj.idTipo,
    obj.idCuenta,
    obj.emisorDestinatario,
    obj.monto,
    obj.intereses,
    obj.cuota,
    obj.vencimiento
  ];

  return db._insertPromise(tx, query, params);
}

export function _insert(obj, successCallback, errorCallback) {
  db._createTransaction((tx) => {
    _insertTx(tx, obj, successCallback, errorCallback);
  })
}
