import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.MyBudgetApp');

const debugMode = true;

function log(debugMode, status, method, params, query, id, data) {
  if (debugMode) {    
    console.log({ 
      status:status, 
      method: method, 
      query: query, 
      params: params,
      id: id,
      data: data
    });
  }
}

logSuccess = (debugMode, method, params, query, id, data) => log(debugMode, "OK", method, params, query, id, data);
logError = (debugMode, method, params, query, id, data) => log(debugMode, "ERROR", method, params, query, id, data);

export function _createTransaction(callback){
  db.transaction((tx) => {
    callback(tx);
  });
}

export function _createTable(tx, tableName, query, successCallback, errorCallback){
    tx.executeSql(query, null,
      () => {
        if (successCallback) {
          successCallback();
        }
        console.log("OK - La tabla '" + tableName + "' se creó correctamente.")
      },
      (txObj, error) => {
        if (errorCallback) {
          errorCallback();
        }
        console.log("ERROR - La tabla '" + tableName + "' no pudo ser creada. - " + error); 
      }
  );
}

export function _dropTable(tx, tableName){
  tx.executeSql("DROP TABLE " + tableName, null, () => {
    console.log("OK - La tabla '" + tableName + "' se eliminó correctamente.")
  }, (txObj, error) => {
    console.log("ERROR - La tabla '" + tableName + "' no pudo ser eliminada. - " + error)
  });
}

/* INSERT */

export function _updateTx(tx, query, params, successCallback, errorCallback) {
  tx.executeSql(
    query,
    params,
    (txObj, resultSet) => {
      logSuccess(debugMode, "_update", params, query, resultSet?.insertId);
      if (successCallback) {
        successCallback(resultSet.insertId);
      }
    },
    (txObj, error) => {
      logError(debugMode, "_update", params, query);
      if (errorCallback) {
        errorCallback(error);
      }
    }
  );
}

export function _update(query, params, successCallback, errorCallback) {
  _createTransaction((tx) => {
    _updateTx(tx, query, params, successCallback, errorCallback);
  });
}

export function _insertTx(tx, query, params, successCallback, errorCallback) {
  tx.executeSql(
    query,
    params,
    (txObj, resultSet) => {
      logSuccess(debugMode, "_insert", params, query, resultSet?.insertId);
      if (successCallback) {
        successCallback(resultSet.insertId);
      }
    },
    (txObj, error) => {
      logError(debugMode, "_insert", params, query);
      if (errorCallback) {
        errorCallback(error);
      }
    }
  );
}

export function _insert(query, params, successCallback, errorCallback) {
  _createTransaction((tx) => {
    _insertTx(tx, query, params, successCallback, errorCallback);
  });
}

/* SELECT */

export function _count(tableName, successCallback, errorCallback) {
  _select("SELECT COUNT(1) FROM " + tableName, null, successCallback, errorCallback);
}

export function _select(query, params, successCallback, errorCallback) {
  db.transaction(tx => {
    tx.executeSql(query, params,
      (txObj, { rows: { _array } }) => {
        logSuccess(debugMode, '_select', params, query, null, _array);
        successCallback(_array);
      },
      (txObj, error) => {
        logError(debugMode, "_select", params, query);
        errorCallback(error); 
      })
  })
}

export function _selectById(tableName, id, successCallback, errorCallback) {
  _select("SELECT * FROM " + tableName + " WHERE id = ?", [id], successCallback, errorCallback);
}

export function _selectAllByIdUsuario(tableName, idUsuario, successCallback, errorCallback) {
  _select("SELECT * FROM " + tableName + " WHERE idUsuario = ?", [idUsuario], successCallback, errorCallback);
}

export function _selectAll(tableName, successCallback, errorCallback) {
  _select("SELECT * FROM " + tableName, null, successCallback, errorCallback);
}

/* DELETE */

export function _deleteTx(tx, query, params, successCallback, errorCallback) {
  tx.executeSql(
    query,
    params,
    (txObj, resultSet) => {
      logSuccess(debugMode, "_delete", params, query, resultSet?.insertId);
      if (successCallback) {
        successCallback(resultSet.insertId);
      }
    },
    (txObj, error) => {
      logError(debugMode, "_delete", params, query);
      if (errorCallback) {
        errorCallback(error);
      }
    }
  );
}

export function _delete(query, params, successCallback, errorCallback) {
  _createTransaction((tx) => {
    _deleteTx(tx, query, params, successCallback, errorCallback);
  });
}

export function _deleteByIdTx(tx, tableName, id, successCallback, errorCallback) {
  _deleteTx(tx, "DELETE FROM " + tableName + " WHERE id = ?", [id], successCallback, errorCallback);
}

export function _deleteById(tableName, id, successCallback, errorCallback) {
  _createTransaction((tx) => {
    _deleteByIdTx(tx, tableName, id, successCallback, errorCallback);
  });
}

export function _getVencimientos(idUsuario, from, to, successCallback, errorCallback) {
  var query =

    "SELECT tipoVencimiento, descripcion, vencimiento FROM " +
    "(SELECT 1 as tipoVencimiento, " +
    " tipoEgreso.tipoEgreso as descripcion, " +
    " egreso.proxVencimiento as vencimiento" +
    " FROM Egresos egreso " + 
    " INNER JOIN TiposEgreso tipoEgreso ON egreso.idTipoEgreso = tipoEgreso.id " +
    " LEFT JOIN CategoriasEgreso categoriaEgreso ON egreso.idCategoriaEgreso = categoriaEgreso.id " +
    " WHERE egreso.idUsuario = ? " +
    " AND idMedioPago = '2' " + 
    " AND egreso.proxVencimiento BETWEEN ? AND ?" +
    " UNION " +
    "SELECT 2 as tipoVencimiento, " +
    " tipo.tipoInversion as descripcion," +
    " inversion.fechaVencimiento as vencimiento " +
    " FROM Inversiones inversion " + 
    " INNER JOIN TiposInversion tipo ON inversion.idTipo = tipo.id " +
    " WHERE inversion.idUsuario = ? " +
    " AND inversion.idTipo = '2' " +
    " AND inversion.fechaVencimiento BETWEEN ? AND ?" +
    " UNION " +
    "SELECT 3 as tipoVencimiento, " +
    " tipo.tipoPrestamo as descripcion," +
    " prestamo.vencimiento as vencimiento " +
    " FROM Prestamos prestamo " + 
    " INNER JOIN TiposPrestamo tipo ON prestamo.idTipo = tipo.id " +
    " WHERE prestamo.idUsuario = ? " +
    " AND prestamo.idTipo = '2' " +
    " AND prestamo.vencimiento BETWEEN ? AND ?)" +
    " ORDER BY vencimiento ASC";

  var params = [idUsuario, from, to, idUsuario, from, to, idUsuario, from, to];

  _select(query, params, successCallback, errorCallback);
}