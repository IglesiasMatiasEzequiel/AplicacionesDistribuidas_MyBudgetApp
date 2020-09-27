import * as db from "../DataBase";

const tableName = "CategoriasEgreso";

export function _createTable(tx) {
  var query = "CREATE TABLE " + tableName + " (" +
  "id INTEGER PRIMARY KEY," +
  "categoriaEgreso VARCHAR(255))";

  db._createTable(tx, tableName, query, () => {
    _populateTable(tx);
  });
}

export function _dropTable(tx) {
  db._dropTable(tx, tableName);
}

export function _populateTable(tx) {
  _insertTx(tx,{ id: 1, desc: "Servicio - Luz" });
  _insertTx(tx,{ id: 2, desc: "Servicio - Gas" });
  _insertTx(tx,{ id: 3, desc: "Servicio - Cable" });
  _insertTx(tx,{ id: 4, desc: "Servicio - Teléfono" });
  _insertTx(tx,{ id: 5, desc: "Impuestos nacionales" });
  _insertTx(tx,{ id: 6, desc: "Impuestos provinciales" });
  _insertTx(tx,{ id: 7, desc: "Impuestos municipales" });
  _insertTx(tx,{ id: 8, desc: "Educación" });
  _insertTx(tx,{ id: 9, desc: "Salud" });
  _insertTx(tx,{ id: 10, desc: "Gastos varios" });
  _insertTx(tx,{ id: 11, desc: "Comida" });
  _insertTx(tx,{ id: 12, desc: "Viáticos" });
  _insertTx(tx,{ id: 13, desc: "Entretenimiento" });
  _insertTx(tx,{ id: 14, desc: "Otros" });
}

export function _insertTx(tx, obj) {

  var query = "INSERT INTO " + tableName + " (id, categoriaEgreso)" + " VALUES (?, ?)";
  var params = [obj.id, obj.desc];

  db._insertTx(tx, query, params);
}

export function _selectAll(successCallback, errorCallback) {
  db._selectAll(tableName, successCallback, errorCallback);
}