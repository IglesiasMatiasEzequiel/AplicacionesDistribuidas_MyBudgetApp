import * as SQLite from 'expo-sqlite';
import { useCallback } from 'react';
const db = SQLite.openDatabase('db.MyBudgetApp');

const debugMode = false;

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

export function _insertTx(tx, query, params) {
  tx.executeSql(
    query,
    params,
    (txObj, resultSet) => {
      logSuccess(debugMode, "_insert", params, query, resultSet?.insertId);
    },
    (txObj, error) => {
      logError(debugMode, "_insert", params, query);
    }
  );
}

export function _insert(query, params, successCallback, errorCallback) {
  db.transaction((tx) => {
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

export function _delete(query, params, successCallback, errorCallback){
  dt.transaction(tx => {
    tx.executeSql(query, params,
      (txObj, { rows: { _array } }) => { successCallback(_array)},
      (txObj, error) => errorCallback())
  })
}

export function _deleteById(tableName, id, successCallback, errorCallback) {
  deleteQuery("DELETE " + tableName + " WHERE id = ?", [id], successCallback, errorCallback);
}