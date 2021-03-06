import * as db from "../DataBase";

const tableName = "Ingresos";

export function _createTable(tx, successCallback, errorCallback) {
  var query = "CREATE TABLE IF NOT EXISTS " + tableName+ " (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT," +
  "idUsuario INTEGER," +
  "idTipoIngreso INTEGER," +
  "idCategoriaIngreso INTEGER," +
  "idDestinoIngreso INTEGER," +
  "idCuenta INTEGER," + 
  "fecha DATE," +
  "monto NUMERIC(10, 2)," +
  "descripcion VARCHAR(255)," +
  "FOREIGN KEY(idUsuario) REFERENCES Usuarios(id), " +
  "FOREIGN KEY(idTipoIngreso) REFERENCES TiposIngreso(id), " +
  "FOREIGN KEY(idCategoriaIngreso) REFERENCES CategoriasIngreso(id), " +
  "FOREIGN KEY(idDestinoIngreso) REFERENCES DestinosIngreso(id), " +
  "FOREIGN KEY(idCuenta) REFERENCES Cuentas(id))";
    
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

export function _deleteByIdCuentaTx(tx, idCuenta, successCallback, errorCallback) {
  
  var query = "DELETE FROM " + tableName + " WHERE idCuenta = ? ";
  var params = [idCuenta];

  db._deleteTx(tx, query, params, successCallback, errorCallback)
}

export function _getListado(idUsuario, from, to, successCallback, errorCallback){

  var query = "SELECT ingreso.id, " +
  " ingreso.fecha, " +
  " ingreso.monto, " +
  " ingreso.descripcion, " +
  " tipoIngreso.tipoIngreso, " +
  " categoriaIngreso.categoriaIngreso, " +
  " destinoIngreso.destinoIngreso, " +
  " banco.banco || ' - ' || cuenta.cbu as cuenta " +
  " FROM " + tableName + " as ingreso " +
  " INNER JOIN TiposIngreso tipoIngreso ON ingreso.idTipoIngreso = tipoIngreso.id " +
  " INNER JOIN DestinosIngreso destinoIngreso ON ingreso.idDestinoIngreso = destinoIngreso.id " +
  " LEFT JOIN CategoriasIngreso categoriaIngreso ON ingreso.idCategoriaIngreso = categoriaIngreso.id " +
  " LEFT JOIN Cuentas cuenta ON ingreso.idCuenta = cuenta.id " +
  " LEFT JOIN Bancos banco ON cuenta.idBanco = banco.id " +
  " WHERE ingreso.idUsuario = ? " +
  " AND ingreso.fecha BETWEEN ? AND ? " + 
  " ORDER BY ingreso.fecha DESC, ingreso.idCuenta";

  var params = [idUsuario, from, to];

  db._select(query, params, successCallback, errorCallback);
}

export function _getListadoCuenta(idUsuario, idCuenta, from, to, successCallback, errorCallback){

  var query = "SELECT ingreso.id, " +
  " ingreso.fecha, " +
  " ingreso.monto, " +
  " ingreso.descripcion, " +
  " tipoIngreso.tipoIngreso, " +
  " categoriaIngreso.categoriaIngreso " +
  " FROM " + tableName + " as ingreso " +
  " INNER JOIN TiposIngreso tipoIngreso ON ingreso.idTipoIngreso = tipoIngreso.id " +
  " LEFT JOIN CategoriasIngreso categoriaIngreso ON ingreso.idCategoriaIngreso = categoriaIngreso.id " +
  " WHERE ingreso.idUsuario = ? " +
  " AND ingreso.idDestinoIngreso = '1' " +
  " AND ingreso.idCuenta = ? " +
  " AND ingreso.fecha BETWEEN ? AND ? " + 
  " ORDER BY ingreso.fecha DESC, ingreso.idCuenta";

  var params = [idUsuario, idCuenta, from, to];

  db._select(query, params, successCallback, errorCallback);
}

export function _insertTx(tx, obj, successCallback, errorCallback) {
  var query =
    "INSERT INTO Ingresos(" +
    " idUsuario," +
    " idTipoIngreso," +
    " idCategoriaIngreso," +
    " idDestinoIngreso," +
    " idCuenta," +
    " fecha," +
    " monto," +
    " descripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  var params = [
    obj.idUsuario,
    obj.idTipoIngreso,
    obj.idCategoriaIngreso,
    obj.idDestinoIngreso,
    obj.idCuenta,
    obj.fecha,
    obj.monto,
    obj.descripcion
  ];

  db._insertTx(tx, query, params, successCallback, errorCallback);
}

export function _insertPromise(tx, obj) {
  
  var query =
    "INSERT INTO Ingresos(" +
    " idUsuario," +
    " idTipoIngreso," +
    " idCategoriaIngreso," +
    " idDestinoIngreso," +
    " idCuenta," +
    " fecha," +
    " monto," +
    " descripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
   
    var params = [
      obj.idUsuario,
      obj.idTipoIngreso,
      obj.idCategoriaIngreso,
      obj.idDestinoIngreso,
      obj.idCuenta,
      obj.fecha,
      obj.monto,
      obj.descripcion
    ];

  return db._insertPromise(tx, query, params);
}

export function _insert(obj, successCallback, errorCallback) {
  db._createTransaction((tx) => {
    _insertTx(tx, obj, successCallback, errorCallback);
  });
}