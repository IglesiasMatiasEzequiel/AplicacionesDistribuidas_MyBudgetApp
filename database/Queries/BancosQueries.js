import * as db from "../DataBase";

const tableName = "Bancos";

export function _createTable(tx) {
  var query = "CREATE TABLE " + tableName + " (" +
  "id INTEGER PRIMARY KEY," +
  "banco VARCHAR(255))";

  db._createTable(tx, tableName, query, () => {
    _populateTable(tx);
  });
}

export function _dropTable(tx) {
  db._dropTable(tx, tableName);
}

export function _populateTable(tx) {
  _insertTx(tx, { id: 1, desc: "Banco Galicia" });
  _insertTx(tx, { id: 2, desc: "BBVA Francés" });
  _insertTx(tx, { id: 3, desc: "HSBC" });
  _insertTx(tx, { id: 4, desc: "Banco Santander" });
}

export function _insertTx(tx, obj) {

  var query = "INSERT INTO " + tableName + " (id, banco)" + " VALUES (?, ?)";
  var params = [obj.id, obj.desc];

  db._insertTx(tx, query, params);
}

export function _selectAll(successCallback, errorCallback) {
  db._selectAll(tableName, successCallback, errorCallback);
}