import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.MyBudgetApp');

const debugMode = true;

export function _createTable(tableName, query){
  db.transaction(tx => {
    tx.executeSql(query, null,
      () => console.log("Tabla " + tableName + " creada correctamente."),
      (txObj, error) => console.log("ERROR - La tabla " + tableName + " no pudo ser creada. - " + error)
  )})
}

export function _dropTable(tableName){
  db.transaction((tx) => {
    tx.executeSql("DROP TABLE " + tableName);
  });
}

/* INSERT */

export function _insert(query, params, successCallback, errorCallback){
  db.transaction(tx => {
    tx.executeSql(query, params,
      (txObj, resultSet) => { 
        if(debugMode){
          console.log('SUCCESS');
          console.log('method: _insert');
          console.log('params: ' + params)
          console.log('id: ' + (resultSet?.insertId ?? '-'));
          console.log('query: ' + query);
        }
        successCallback(resultSet.insertId);
      },
      (txObj, error) => { 
        if(debugMode){
          console.log('ERROR');
          console.log('method: _insert');
          console.log('params: ' + params)
          console.log('query: ' + query);
        }
        errorCallback(error) 
      })
  })
}

/* SELECT */

export function _select(query, params, successCallback, errorCallback) {
  db.transaction(tx => {
    tx.executeSql(query, params,
      (txObj, { rows: { _array } }) => { successCallback(_array)},
      (txObj, error) => errorCallback(error))
  })
}

export function _selectById(tableName, id, successCallback, errorCallback) {
  selectQuery("SELECT * FROM " + tableName + " WHERE id = ?", [id], successCallback, errorCallback);
}

export function _selectAllByIdUsuario(tableName, idUsuario, successCallback, errorCallback) {
  selectQuery("SELECT * FROM " + tableName + " WHERE idUsuario = ?", [idUsuario], successCallback, errorCallback);
}

export function _selectAll(tableName, successCallback, errorCallback) {
  selectQuery("SELECT * FROM " + tableName, null, successCallback, errorCallback);
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