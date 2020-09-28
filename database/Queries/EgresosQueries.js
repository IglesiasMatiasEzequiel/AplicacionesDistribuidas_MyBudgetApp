import * as db from "../DataBase";

const tableName = "Egresos";

export function _createTable(tx) {
  var query = 
  "CREATE TABLE IF NOT EXISTS Egresos (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "idUsuario INTEGER," +
    "idTipoEgreso INTEGER," +
    "idCategoriaEgreso INTEGER," +
    "idCuenta INTEGER," +
    "idTarjeta INTEGER," +
    "idMedioPago INTEGER," +
    "fecha DATE," +
    "monto NUMERIC(10, 2)," +
    "detalleEgreso VARCHAR(255)," +
    "cuotas INTEGER," +
    "FOREIGN KEY(idMedioPago) REFERENCES MediosPago(id)," +
    "FOREIGN KEY(idTarjeta) REFERENCES Tarjetas(id)," +
    "FOREIGN KEY(idCuenta) REFERENCES Cuentas(id)," +
    "FOREIGN KEY(idCategoriaEgreso) REFERENCES CategoriasEgreso(id)," +
    "FOREIGN KEY(idTipoEgreso) REFERENCES TiposEgreso(id)," +
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

export function _deleteByIdCuentaTx(tx, idCuenta, successCallback, errorCallback) {
  
  var query = "DELETE FROM " + tableName + " WHERE idCuenta = ? ";
  var params = [idCuenta];

  db._deleteTx(tx, query, params, successCallback, errorCallback)
}

export function _insert(obj, successCallback, errorCallback) {
  
  var query =
    "INSERT INTO " +
    tableName +
    "(idUsuario, idTipoEgreso, idCategoriaEgreso, idCuenta, idTarjeta, idMedioPago, fecha, monto, detalleEgreso, cuotas ) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
   
  var params = [
    obj.idUsuario,
    obj.idTipoEgreso,
    obj.idCategoriaEgreso,
    obj.idCuenta,
    obj.idTarjeta,
    obj.idMedioPago,
    obj.fecha,
    obj.monto,
    obj.detalleEgreso,
    obj.cuotas,
  ];

  db._insert(query, params, successCallback, errorCallback);
}