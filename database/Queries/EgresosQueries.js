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

export function _getListado(idUsuario, from, to, successCallback, errorCallback){

  var query = "SELECT egreso.id, " +
  " egreso.fecha, " +
  " egreso.monto, " +
  " egreso.detalleEgreso, " +
  " egreso.cuotas, " +
  " medioPago.medioPago, " +
  " tipoEgreso.tipoEgreso, " +
  " categoriaEgreso.categoriaEgreso, " +
  " banco.banco || ' - ' || cuenta.cbu as cuenta, " +
  " entidadEmisora.entidadEmisora || ' - **** **** **** ' || tarjeta.tarjeta as tarjeta " +
  " FROM " + tableName + " as egreso " +
  " INNER JOIN TiposEgreso tipoEgreso ON egreso.idTipoEgreso = tipoEgreso.id " +
  " INNER JOIN MediosPago medioPago ON egreso.idMedioPago = medioPago.id " +
  " LEFT JOIN CategoriasEgreso categoriaEgreso ON egreso.idCategoriaEgreso = categoriaEgreso.id " +
  " LEFT JOIN Cuentas cuenta ON egreso.idCuenta = cuenta.id " +
  " LEFT JOIN Bancos banco ON cuenta.idBanco = banco.id " +
  " LEFT JOIN Tarjetas tarjeta ON egreso.idTarjeta = tarjeta.id " +
  " LEFT JOIN EntidadesEmisoras entidadEmisora ON tarjeta.idEntidadEmisora = entidadEmisora.id " +
  " WHERE egreso.idUsuario = ? " +
  " AND egreso.fecha BETWEEN ? AND ? ";

  var params = [idUsuario, from, to];

  db._select(query, params, successCallback, errorCallback);
}

export function _deleteByIdCuentaTx(tx, idCuenta, successCallback, errorCallback) {
  
  var query = "DELETE FROM " + tableName + " WHERE idCuenta = ? ";
  var params = [idCuenta];

  db._deleteTx(tx, query, params, successCallback, errorCallback)
}

export function _insertTx(tx, obj, successCallback, errorCallback) {
  
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

  db._insertTx(tx, query, params, successCallback, errorCallback);
}

export function _insert(obj, successCallback, errorCallback) {
  db._createTransaction((tx) => {
    _insertTx(tx, obj, successCallback, errorCallback);
  });
}