import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.MyBudgetApp');

export function createTables() {
    db.transaction((tx) => {
        tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Usuarios (" +
            "id INTEGER PRIMARY KEY AUTOINCREMENT," +
            "email VARCHAR(150)," +
            "nombre VARCHAR(100)," + 
            "apellido VARCHAR(100)," + 
            "password VARCHAR(50))"
        , null, () => { console.log('Tabla Usuarios creada correctamente.')}, () => { console.log('ERROR - La Tabla Usuarios no pudo ser creada.')},);
    });
    db.transaction((tx) => {
      tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Presupuestos (" +
          "id INTEGER PRIMARY KEY AUTOINCREMENT," +
          "idUsuario INTEGER FOREIGN KEY REFERENCES Usuario(id)," +
          "tipo VARCHAR(100)," +
          "monto VARCHAR(100)," + 
          "fechaInicio VARCHAR(10)," 
      , null, () => { console.log('Tabla Presupuestos creada correctamente.')}, () => { console.log('ERROR - La Tabla Presupuestos no pudo ser creada.')},);
    });
};

export function deleteTables() {
    db.transaction((tx) => {
        tx.executeSql(
        "DROP TABLE Usuarios"
        );
    });
    db.transaction((tx) => {
        tx.executeSql(
        "DROP TABLE Ingresos"
        );
    });
    db.transaction((tx) => {
      tx.executeSql(
      "DROP TABLE Presupuestos"
      );
  });
};



/* Usuarios */

export function login (email, password, successCallback, errorCallback) {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Usuarios WHERE UPPER(email) = ? AND password = ?', [email.toUpperCase(), password],
        (txObj, { rows: { _array } }) => { successCallback(_array)},
        (txObj, error) => errorCallback())
    })
  }
export function insertUsuario (email, nombre, apellido, password, successCallback, errorCallback) {
    db.transaction(tx => {
      tx.executeSql("INSERT INTO Usuarios(email, nombre, apellido, password) VALUES (?, ?, ?, ?)", [email, nombre, apellido, password],
        (txObj, resultSet) => { successCallback(resultSet.insertId) } ,
        (txObj, error) => { errorCallback() })
    })
  }
export function selectUsuarioById (id, successCallback, errorCallback) {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Usuarios WHERE id = ?', [id],
        (txObj, { rows: { _array } }) => { successCallback(_array)},
        (txObj, error) => errorCallback())
    })
  }

/* Usuarios */

/* Presupuestos */
export function insertPresupuesto (idUsuario, tipo, monto, fechaInicio) {
  db.transaction(tx => {
    tx.executeSql("INSERT INTO Presupuestos(idUsuario, tipo, dinero, fechaInicio) VALUES (?, ?, ?, ?)", [idUsuario, tipo, monto, fechaInicio],
      (txObj, resultSet) => { successCallback(resultSet.insertId) } ,
      (txObj, error) => { errorCallback() })
  })
}
export function selectPresupuestoById (id, idUsuario, successCallback, errorCallback) {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM Presupuestos WHERE id = ? idUsuario =?', [id,idUsuario],
      (txObj, { rows: { _array } }) => { successCallback(_array)},
      (txObj, error) => errorCallback())
  })
}
export function selectPresupuestos (idUsuario, successCallback, errorCallback) {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM Presupuestos idUsuario = ?', [idUsuario],
      (txObj, { rows: { _array } }) => { successCallback(_array)},
      (txObj, error) => errorCallback())
  })
}
export function deletePresupuestoById (id, idUsuario, successCallback, errorCallback) {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM Presupuestos WHERE WHERE id = ? idUsuario =?', [id,idUsuario],
      (txObj, { rows: { _array } }) => { successCallback(_array)},
      (txObj, error) => errorCallback())
  })
}
/* Presupuestos */
