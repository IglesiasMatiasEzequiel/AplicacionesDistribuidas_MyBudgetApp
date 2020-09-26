import * as db from "../DataBase";

const tableName = "Inversiones";

export function _createTable() {
  var query = "";

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

/*Inversiones*/

// db.transaction((tx) => {
//   tx.executeSql(
//     "CREATE TABLE IF NOT EXISTS Inversiones (" +
//       "id INTEGER PRIMARY KEY AUTOINCREMENT," +
//       "idUsuario INTEGER FOREIGN KEY REFERENCES Usuario(id)," +
//       "tipo VARCHAR(150)," +
//       "monto VARCHAR(100)," +
//       "origen VARCHAR(100)," +
//       "fechaInicio VARCHAR(10))",
//     null,
//     () => {
//       console.log("Tabla Inversiones creada correctamente.");
//     },
//     () => {
//       console.log("ERROR - La Tabla Inversiones no pudo ser creada.");
//     }
//   );
// });

// export function selectInversionById (id, idUsuario, successCallback, errorCallback) {
//   db.transaction(tx => {
//     tx.executeSql("Select * FROM Inversiones WHERE id = ? idUsuario = ?",[id, idUsuario],
//       (txObj, { rows: { _array } }) => { successCallback(_array)},
//       (txObj, error) => errorCallback())
//     })
//   }

// export function selectInversion (successCallback, errorCallback) {
//   db.transaction(tx => {
//     tx.executeSql("SELECT * FROM Inversiones idUsuario =", [idUsuario],
//       (txObj, resultSet) => { successCallback(resultSet.insertId) } ,
//       (txObj, error) => { errorCallback() })
//   })
// }

// export function insertInversion (idUsuario, monto, origen, fechaInicio){
//   db.transaction(tx => {
//     tx.executeSql("INSERT INTO Inversiones(idUsuario, monto, origen, fechaInicio) VALUES (?, ?, ?, ?)",[idUsuario, monto, origen, fechaInicio],
//       (txObj, resultSet) => { successCallback(resultSet.insertId) } ,
//       (txObj, error) => { errorCallback() })
//   })
// }

// export function deleteInversionById (id, idUsuario, successCallback, errorCallback){
//   dt.transaction(tx => {
//     tx.executeSql("DELETE FROM Inversiones WHERE WHERE id = ? idUsuario =?", [id, idUsuario],
//       (txObj, { rows: { _array } }) => { successCallback(_array)},
//       (txObj, error) => errorCallback())
//     })
// }

/*Inversiones*/

