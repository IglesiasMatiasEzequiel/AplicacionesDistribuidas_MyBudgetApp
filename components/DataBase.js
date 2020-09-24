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

