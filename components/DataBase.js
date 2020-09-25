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

    /*Prestamos*/
    db.transaction((tx) => {
      tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Prestamos (" +
          "id INTEGER PRIMARY KEY AUTOINCREMENT," +
          "idUsuario INTEGER FOREIGN KEY REFERENCES Usuario(id)," +
          "tipo VARCHAR(150)," +
          "tipoPersona VARCHAR(100)," + 
          "monto VARCHAR(100)," + 
          "intereses VARCHAR(50))"
      , null, () => { console.log('Tabla Prestamos creada correctamente.')}, () => { console.log('ERROR - La Tabla Prestamos no pudo ser creada.')},);
  });

  /*Inversiones*/
  db.transaction((tx) => {
    tx.executeSql(
    "CREATE TABLE IF NOT EXISTS Inversiones (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        "idUsuario INTEGER FOREIGN KEY REFERENCES Usuario(id)," +
        "tipo VARCHAR(150)," +
        "monto VARCHAR(100)," + 
        "origen VARCHAR(100)," + 
        "fechaInicio VARCHAR(10))"
    , null, () => { console.log('Tabla Inversiones creada correctamente.')}, () => { console.log('ERROR - La Tabla Inversiones no pudo ser creada.')},);
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



/*Prestamos*/

export function insertPrestamo (idUsuario, tipo, tipoPersona, monto, intereses){
  db.transaction(tx => {
    tx.executeSql("INSERT INTO prestamos(idUsuario, tipo, tipoPersona, monto, intereses) VALUES (?, ?, ?, ?, ?)",[idUsuario, tipo, tipoPersona, monto, intereses],
    (txObj, resultSet) => { successCallback(resultSet.insertId) } ,
    (txObj, error) => { errorCallback() })
  })
}

export function deletePrestamoById (id, idUsuario, successCallback, errorCallback){
  dt.transaction(tx => {
    tx.executeSql("DELETE FROM prestamos WHERE WHERE id = ? idUsuario =?", [id, idUsuario],
      (txObj, { rows: { _array } }) => { successCallback(_array)},
      (txObj, error) => errorCallback())
  })
}

export function selectPrestamoById (id, idUsuario, successCallback, errorCallback) {
  db.transaction(tx => {
    tx.executeSql("Select * FROM Prestamos WHERE id = ? idUsuario = ?",[id, idUsuario],
      (txObj, { rows: { _array } }) => { successCallback(_array)},
      (txObj, error) => errorCallback())
  })
}

export function selectPrestamos (successCallback, errorCallback) {
  db.transaction(tx => {
    tx.executeSql("SELECT * FROM Prestamos idUsuario =", [idUsuario],
      (txObj, { rows: { _array } }) => { successCallback(_array)},
      (txObj, error) => errorCallback())
  })
}

/*Prestamos*/



/*Inversiones*/
  
export function insertInversion (idUsuario, monto, origen, fechaInicio){
  db.transaction(tx => {
    tx.executeSql("INSERT INTO Inversiones(idUsuario, monto, origen, fechaInicio) VALUES (?, ?, ?, ?)",[idUsuario, monto, origen, fechaInicio],
    (txObj, resultSet) => { successCallback(resultSet.insertId) } ,
    (txObj, error) => { errorCallback() })
  })
}

export function deleteInversionById (id, idUsuario, successCallback, errorCallback){
  dt.transaction(tx => {
    tx.executeSql("DELETE FROM Inversiones WHERE WHERE id = ? idUsuario =?", [id, idUsuario],
      (txObj, { rows: { _array } }) => { successCallback(_array)},
      (txObj, error) => errorCallback())
  })
}

export function selectInversionById (id, idUsuario, successCallback, errorCallback) {
  db.transaction(tx => {
    tx.executeSql("Select * FROM Inversiones WHERE id = ? idUsuario = ?",[id, idUsuario],
      (txObj, { rows: { _array } }) => { successCallback(_array)},
      (txObj, error) => errorCallback())
  })
}

export function selectInversion (successCallback, errorCallback) {
  db.transaction(tx => {
    tx.executeSql("SELECT * FROM Inversiones idUsuario =", [idUsuario],
      (txObj, { rows: { _array } }) => { successCallback(_array)},
      (txObj, error) => errorCallback())
  })
}

/*Inversiones*/ 

