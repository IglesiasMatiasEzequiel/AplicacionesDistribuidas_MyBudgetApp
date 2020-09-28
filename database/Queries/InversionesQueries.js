import * as db from "../DataBase";

const tableName = "Inversiones";

export function _createTable(tx) {
  var query = "CREATE TABLE IF NOT EXISTS " + tableName+ " (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT," +
  "idUsuario INTEGER," +
  "idTipo INTEGER," +
  "idMonto INTEGER," +
  "idOrigen INTEGER," +
  "idFechaInicio INTEGER," +
  "idNombre INTEGER," +
  "idDuracion INTEGER," +
  "monto NUMERIC(10, 2)," +
  "origen VARCHAR(255)," +
  "fechaInicio DATE," +
  "FOREIGN KEY(idUsuario) REFERENCES Usuarios(id), " +
  "FOREIGN KEY(idTipo) REFERENCES Tipos(id))" ;

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

export function _getListado(idUsuario, successCallback, errorCallback){

  var query = "SELECT ingreso.id, " +
  " tipo.tipo, " +
  " inversion.monto, " +
  " inversion.origen, " +
  " inversion.fechaInicio, " +
  " inversion.nombre, " +
  " inversion.duracion, " +
  " banco.banco || ' - ' || cuenta.cbu as cuenta " +
  " FROM " + tableName + " as inversion " +
  " INNER JOIN Tipos tipo ON inversion.idTipo = tipo.id ";
 

  var params = [idUsuario];

  db._select(query, params, successCallback, errorCallback);
}

export function _insert(obj, successCallback, errorCallback) {
  var query =
    "INSERT INTO Ingresos(" +
    " idUsuario," +
    " idTipo," +
    " monto," +
    " origen," +
    " fechaInicio," +
    " nombre," +
    " duracion) VALUES (?, ?, ?, ?, ?, ?, ?)";

  var params = [
    obj.idUsuario,
    obj.idTipo,
    obj.monto,
    obj.origen,
    obj.fechaInicio,
    obj.nombre,
    obj.duracion
  ];

  db._insert(query, params, successCallback, errorCallback);
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

