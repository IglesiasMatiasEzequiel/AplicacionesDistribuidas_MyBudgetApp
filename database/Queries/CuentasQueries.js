import * as db from "../DataBase";
import * as IngresosQueries from './IngresosQueries';
import * as EgresosQueries from './EgresosQueries';

const tableName = "Cuentas";

export function _createTable(tx, successCallback, errorCallback) {
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
  db._createTransaction((tx) => {
    IngresosQueries._deleteByIdCuentaTx(tx, id, () => {
      EgresosQueries._deleteByIdCuentaTx(tx, id, () => {
        db._deleteByIdTx(tx, tableName, id, successCallback, errorCallback);
      });
    });
  });
}

export function _getListado(idUsuario, successCallback, errorCallback){

  var query = "SELECT cuenta.id, " +
  " banco.banco, " +
  " entidadEmisora.entidadEmisora, " +
  " cuenta.cbu, " +
  " cuenta.alias, " +
  " cuenta.descripcion, " +
  " cuenta.monto, " +
  " cuenta.tarjeta, " +
  " cuenta.vencimiento " +
  " FROM " + tableName + " as cuenta " +
  " INNER JOIN Bancos banco ON cuenta.idBanco = banco.id " +
  " INNER JOIN EntidadesEmisoras entidadEmisora ON cuenta.idEntidadEmisora = entidadEmisora.id " +
  " WHERE cuenta.idUsuario = ? ";

  var params = [idUsuario];

  db._select(query, params, successCallback, errorCallback);
}

export function _getMovimientos(idUsuario, idCuenta, from, to, successCallback, errorCallback) {
  var query =
    "SELECT id, tipoRegistro, fecha, monto, descripcion, tipo, categoria FROM " +
    "(SELECT egreso.id as id, " +
    " 2 as tipoRegistro, " +
    " egreso.fecha as fecha, " +
    " egreso.monto as monto, " +
    " egreso.detalleEgreso as descripcion, " +
    " tipoEgreso.tipoEgreso as tipo, " +
    " categoriaEgreso.categoriaEgreso as categoria " +
    " FROM Egresos as egreso " +
    " INNER JOIN TiposEgreso tipoEgreso ON egreso.idTipoEgreso = tipoEgreso.id " +
    " LEFT JOIN CategoriasEgreso categoriaEgreso ON egreso.idCategoriaEgreso = categoriaEgreso.id " +
    " WHERE egreso.idUsuario = ? " +
    " AND egreso.idCuenta = ? " +
    " AND (egreso.idMedioPago = '3' OR egreso.idMedioPago = '4' OR egreso.idMedioPago = '5')" +
    " AND egreso.fecha BETWEEN ? AND ?" +
    " UNION " +
    " SELECT ingreso.id as id, " +
    " 1 as tipoRegistro, " +
    " ingreso.fecha as fecha, " +
    " ingreso.monto as monto, " +
    " ingreso.descripcion as descripcion, " +
    " tipoIngreso.tipoIngreso as tipo, " +
    " categoriaIngreso.categoriaIngreso as categoria" +
    " FROM Ingresos as ingreso " +
    " INNER JOIN TiposIngreso tipoIngreso ON ingreso.idTipoIngreso = tipoIngreso.id " +
    " LEFT JOIN CategoriasIngreso categoriaIngreso ON ingreso.idCategoriaIngreso = categoriaIngreso.id " +
    " WHERE ingreso.idUsuario = ? " +
    " AND ingreso.idDestinoIngreso = '1' " +
    " AND ingreso.idCuenta = ? " +
    " AND ingreso.fecha BETWEEN ? AND ?)" +
    " ORDER BY fecha DESC";

  var params = [idUsuario, idCuenta, from, to, idUsuario, idCuenta, from, to];

  db._select(query, params, successCallback, errorCallback);
}

export function _update(obj, successCallback, errorCallback) {
  
  var query =
    "UPDATE " + tableName +
    " SET idBanco = ?, " +
    " idEntidadEmisora = ?, " +
    " cbu = ?, " +
    " alias = ?, " +
    " descripcion = ?, " +
    " tarjeta = ?, " +
    " vencimiento = ? " + 
    " WHERE id = ?";

  var params = [
    obj.idBanco,
    obj.idEntidadEmisora,
    obj.cbu,
    obj.alias,
    obj.descripcion,
    obj.tarjeta,
    obj.vencimiento,
    obj.id
  ];

  db._insert(query, params, successCallback, errorCallback);
}

export function _insert(obj, successCallback, errorCallback) {
  db._createTransaction((tx) => {
    _insertTx(tx, obj, successCallback, errorCallback);
  });
}

export function _insertTx(tx, obj, successCallback, errorCallback) {

  var query =
    "INSERT INTO " +
    tableName +
    "(idUsuario, idBanco, idEntidadEmisora, cbu, alias, descripcion, monto, tarjeta, vencimiento) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    var params = [
      obj.idUsuario,
      obj.idBanco,
      obj.idEntidadEmisora,
      obj.cbu,
      obj.alias,
      obj.descripcion,
      obj.monto,
      obj.tarjeta,
      obj.vencimiento,
    ];

  db._insertTx(tx, query, params, successCallback, errorCallback);
}

export function _updateAgregarMonto(id, monto, successCallback, errorCallback) {
  var query = "UPDATE " + tableName + " SET monto = monto + ? WHERE id = ? ";
  var params = [monto, id];

  db._update(query, params, successCallback, errorCallback);
}

export function _updateQuitarMonto(id, monto, successCallback, errorCallback) {
  var query = "UPDATE " + tableName + " SET monto = monto - ? WHERE id = ? ";
  var params = [monto, id];

  db._update(query, params, successCallback, errorCallback);
}