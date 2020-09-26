import * as db from "../DataBase";

const tableName = "Ingresos";

export function _createTable() {
  var query = "CREATE TABLE IF NOT EXISTS " + tableName+ " (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT," +
  "idUsuario INTEGER," +
  "fecha DATE," +
  "monto NUMERIC(10, 2)," +
  "tipoIngreso INTEGER," +
  "categoriaIngreso INTEGER," +
  "destino INTEGER," +
  "cuenta INTEGER," + 
  "FOREIGN KEY(idUsuario) REFERENCES Usuarios(id))";
    
  db._createTable(tableName, query);
}

export function _dropTable() {
  db._dropTable(tableName);
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
      "INSERT INTO Ingresos(" +
      " idUsuario," +
      " fecha," +
      " monto," +
      " tipoIngreso," +
      " categoriaIngreso," +
      " destino," +
      " cuenta) VALUES (?, STR_TO_DATE(?, '%d/%m/%Y'), ?, ?, ?, ?, ?)";

    var params = [
      obj.idUsuario,
      obj.fecha,
      obj.monto,
      obj.tipoIngreso,
      obj.categoriaIngreso,
      obj.destino,
      obj.cuenta,
    ];
  
    db._insert(query, params, successCallback, errorCallback);
}