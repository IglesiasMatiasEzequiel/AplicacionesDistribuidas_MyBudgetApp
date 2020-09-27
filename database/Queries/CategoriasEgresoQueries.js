import * as db from "../DataBase";

const tableName = "CategoriasEgreso";

export function _createTable() {
  var query = "CREATE TABLE " + tableName + " (" +
  "id INTEGER PRIMARY KEY," +
  "categoriaEgreso VARCHAR(255))";

  db._createTable(tableName, query, () => {
    _populateTable();
  });
}

export function _dropTable() {
  db._dropTable(tableName);
}

export function _populateTable() {
  _insert({ id: 1, desc: "Servicio - Luz" });
  _insert({ id: 2, desc: "Servicio - Gas" });
  _insert({ id: 3, desc: "Servicio - Cable" });
  _insert({ id: 4, desc: "Servicio - Teléfono" });
  _insert({ id: 5, desc: "Impuestos nacionales" });
  _insert({ id: 6, desc: "Impuestos provinciales" });
  _insert({ id: 7, desc: "Impuestos municipales" });
  _insert({ id: 8, desc: "Educación" });
  _insert({ id: 9, desc: "Salud" });
  _insert({ id: 10, desc: "Gastos varios" });
  _insert({ id: 11, desc: "Comida" });
  _insert({ id: 12, desc: "Viáticos" });
  _insert({ id: 13, desc: "Entretenimiento" });
  _insert({ id: 14, desc: "Otros" });
}

export function _insert(obj, successCallback, errorCallback) {

  var query = "INSERT INTO " + tableName + " (id, categoriaEgreso)" + " VALUES (?, ?)";
  var params = [obj.id, obj.desc];

  db._insert(query, params, successCallback, errorCallback);
}

export function _selectAll(successCallback, errorCallback) {
  db._selectAll(tableName, successCallback, errorCallback);
}