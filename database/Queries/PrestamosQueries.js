import * as db from "../DataBase";

const tableName = "Prestamos";

export function _createTable(tx) {
  var query = "CREATE TABLE IF NOT EXISTS " + tableName + " (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT," +
  "idUsuario INTEGER," +
  "idTipo INTEGER," +
  "emisorDestinatario VARCHAR(50)," +
  "monto NUMERIC(10, 2)," +
  "intereses NUMERIC(3, 2)," +
  "vencimiento DATE," +
  "FOREIGN KEY(idTipo) REFERENCES TipoPrestamos(id)," +
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
  db._deleteById(tableName, id, successCallback, errorCallback);
}

export function _getListado(idUsuario, successCallback, errorCallback){

  var query = "SELECT prestamo.id, " +
  " tipo.tipoPrestamo, " +
  " prestamo.emisorDestinatario, " +
  " prestamo.monto, " +
  " prestamo.intereses, " +
  " prestamo.vencimiento " +
  " FROM " + tableName + " as prestamo " +
  " INNER JOIN TiposPrestamo tipo ON prestamo.idTipo = tipo.id " +
  " WHERE prestamo.idUsuario = ? ";

  var params = [idUsuario];

  db._select(query, params, successCallback, errorCallback);
}


export function _insert(obj, successCallback, errorCallback) {
  
  var query =
    "INSERT INTO " +
    tableName +
    "(idUsuario, idTipo, emisorDestinatario, monto, intereses, vencimiento) " +
    "VALUES (?, ?, ?, ?, ?, ?)";

  var params = [
    obj.idUsuario,
    obj.idTipo,
    obj.emisorDestinatario,
    obj.monto,
    obj.intereses,
    obj.vencimiento
  ];

  db._insert(query, params, successCallback, errorCallback);
}

