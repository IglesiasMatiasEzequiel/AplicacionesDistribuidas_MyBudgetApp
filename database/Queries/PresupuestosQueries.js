import * as db from "../DataBase";

const tableName = "Presupuestos";

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

// db.transaction((tx) => {
//   tx.executeSql(
//     "CREATE TABLE IF NOT EXISTS Presupuestos (" +
//       "id INTEGER PRIMARY KEY AUTOINCREMENT," +
//       "idUsuario INTEGER FOREIGN KEY REFERENCES Usuario(id)," +
//       "tipo VARCHAR(100)," +
//       "monto VARCHAR(100)," +
//       "fechaInicio VARCHAR(10),",
//     null,
//     () => {
//       console.log("Tabla Presupuestos creada correctamente.");
//     },
//     () => {
//       console.log("ERROR - La Tabla Presupuestos no pudo ser creada.");
//     }
//   );
// });

// export function insertPresupuesto (idUsuario, tipo, monto, fechaInicio) {
//   db.transaction(tx => {
//     tx.executeSql("INSERT INTO Presupuestos(idUsuario, tipo, dinero, fechaInicio) VALUES (?, ?, ?, ?)", [idUsuario, tipo, monto, fechaInicio],
//       (txObj, resultSet) => { successCallback(resultSet.insertId) } ,
//       (txObj, error) => { errorCallback() })
//   })
// }
// export function selectPresupuestoById (id, idUsuario, successCallback, errorCallback) {
//   db.transaction(tx => {
//     tx.executeSql('SELECT * FROM Presupuestos WHERE id = ? idUsuario =?', [id,idUsuario],
//       (txObj, { rows: { _array } }) => { successCallback(_array)},
//       (txObj, error) => errorCallback())
//   })
// }

// export function selectPresupuestos (idUsuario, successCallback, errorCallback) {
//   db.transaction(tx => {
//     tx.executeSql('SELECT * FROM Presupuestos idUsuario = ?', [idUsuario],
//       (txObj, { rows: { _array } }) => { successCallback(_array)},
//       (txObj, error) => errorCallback())
//   })
// }

// export function deletePresupuestoById (id, idUsuario, successCallback, errorCallback) {
//   db.transaction(tx => {
//     tx.executeSql('DELETE FROM Presupuestos WHERE WHERE id = ? idUsuario =?', [id,idUsuario],
//       (txObj, { rows: { _array } }) => { successCallback(_array)},
//       (txObj, error) => errorCallback())
//   })
// }