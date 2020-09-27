import * as db from "../DataBase";

const tableName = "Prestamos";

export function _createTable(tx) {
  var query = "CREATE TABLE IF NOT EXISTS " + tableName + " (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT," +
  "idUsuario INTEGER," +
  "tipo VARCHAR(20)," +
  "emisorDestinatario VARCHAR(50)," +
  "monto NUMERIC(10, 2)," +
  "intereses NUMERIC(3, 2)," +
  "vencimiento DATE," +
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
  db._deleteById(id, successCallback, errorCallback);
}

export function _insert(obj, successCallback, errorCallback) {
  
  var query =
    "INSERT INTO " +
    tableName +
    "(idUsuario, tipo, emisorDestinatario, monto, intereses, vencimiento) " +
    "VALUES (?, ?, ?, ?, ?, ?)";

  var params = [
    obj.idUsuario,
    obj.tipo,
    obj.emisorDestinatario,
    obj.monto,
    obj.intereses,
    obj.vencimiento
  ];

  db._insert(query, params, successCallback, errorCallback);
}

// db.transaction((tx) => {
//     tx.executeSql(
//       "CREATE TABLE IF NOT EXISTS Prestamos (" +
//         "id INTEGER PRIMARY KEY AUTOINCREMENT," +
//         "idUsuario INTEGER FOREIGN KEY REFERENCES Usuario(id)," +
//         "tipo VARCHAR(150)," +
//         "tipoPersona VARCHAR(100)," +
//         "monto VARCHAR(100)," +
//         "intereses VARCHAR(50))",
//       null,
//       () => {
//         console.log("Tabla Prestamos creada correctamente.");
//       },
//       () => {
//         console.log("ERROR - La Tabla Prestamos no pudo ser creada.");
//       }
//     );
//   });

// export function insertPrestamo (idUsuario, tipo, tipoPersona, monto, intereses){
//   db.transaction(tx => {
//     tx.executeSql("INSERT INTO prestamos(idUsuario, tipo, tipoPersona, monto, intereses) VALUES (?, ?, ?, ?, ?)",[idUsuario, tipo, tipoPersona, monto, intereses],
//     (txObj, resultSet) => { successCallback(resultSet.insertId) } ,
//     (txObj, error) => { errorCallback() })
//   })
// }

// export function deletePrestamoById (id, idUsuario, successCallback, errorCallback){
//   dt.transaction(tx => {
//     tx.executeSql("DELETE FROM prestamos WHERE WHERE id = ? idUsuario =?", [id, idUsuario],
//       (txObj, { rows: { _array } }) => { successCallback(_array)},
//       (txObj, error) => errorCallback())
//   })
// }

// export function selectPrestamoById (id, idUsuario, successCallback, errorCallback) {
//   db.transaction(tx => {
//     tx.executeSql("Select * FROM Prestamos WHERE id = ? idUsuario = ?",[id, idUsuario],
//       (txObj, { rows: { _array } }) => { successCallback(_array)},
//       (txObj, error) => errorCallback())
//   })
// }

// export function selectPrestamos (successCallback, errorCallback) {
//   db.transaction(tx => {
//     tx.executeSql("SELECT * FROM Prestamos idUsuario =", [idUsuario],
//       (txObj, { rows: { _array } }) => { successCallback(_array)},
//       (txObj, error) => errorCallback())
//   })
// }

/*Prestamos*/


/* Presupuestos */