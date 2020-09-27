import * as DataBase from "./DataBase";
import * as UsuariosQueries from "./Queries/UsuariosQueries";
import * as IngresosQueries from './Queries/IngresosQueries';
import * as EgresosQueries from './Queries/EgresosQueries';
import * as PrestamosQueries from './Queries/PrestamosQueries';
import * as PresupuestosQueries from './Queries/PresupuestosQueries';
import * as CuentasQueries from './Queries/CuentasQueries';
import * as InversionesQueries from './Queries/InversionesQueries';
import * as TarjetasQueries from './Queries/TarjetasQueries';
import * as MediosPagoQueries from './Queries/MediosPagoQueries';
import * as TiposIngresoQueries from './Queries/TiposIngresoQueries';
import * as TiposEgresoQueries from './Queries/TiposEgresoQueries';
import * as CategoriasEgresoQueries from './Queries/CategoriasEgresoQueries';
import * as CategoriasIngresoQueries from './Queries/CategoriasIngresoQueries';
import * as BancosQueries from './Queries/BancosQueries';
import * as DestinosEgresoQueries from './Queries/DestinosEgresoQueries';
import * as DestinosIngresoQueries from './Queries/DestinosIngresoQueries';
import * as EntidadesEmisorasQueries from './Queries/EntidadesEmisorasQueries';
import * as EstadosPrestamoQueries from './Queries/EstadosPrestamoQueries';
import * as PeriodosQueries from './Queries/PeriodosQueries';
import * as TiposInversionQueries from './Queries/TiposInversionQueries';
import * as TiposPrestamoQueries from './Queries/TiposPrestamoQueries';

export function createTables() {

  //Abro una transacción para crear las tablas y llenarlas con datos..
  DataBase._createTransaction((tx) => {

    /* Intento crear la tabla de usuarios, 
     * Si pudo es porque no existía y luego creo las demás tablas
     * Si NO pudo es porque las tablas ya fueron creadas */
    UsuariosQueries._createTable(tx, () => {

      /* Crear tablas secundarias */
      MediosPagoQueries._createTable(tx);
      TiposIngresoQueries._createTable(tx);
      TiposEgresoQueries._createTable(tx);
      CategoriasEgresoQueries._createTable(tx);
      CategoriasIngresoQueries._createTable(tx);
      BancosQueries._createTable(tx);
      DestinosEgresoQueries._createTable(tx);
      DestinosIngresoQueries._createTable(tx);
      EntidadesEmisorasQueries._createTable(tx);
      EstadosPrestamoQueries._createTable(tx);
      PeriodosQueries._createTable(tx);
      TiposInversionQueries._createTable(tx);
      TiposPrestamoQueries._createTable(tx);
    
      /* Crear tablas principales */
      IngresosQueries._createTable(tx);
      PresupuestosQueries._createTable(tx);
      CuentasQueries._createTable(tx);
    });
  });
}

export function dropTables() {
  //Abro una transacción para crear las tablas y llenarlas con datos..
  DataBase._createTransaction((tx) => {
    MediosPagoQueries._dropTable(tx);
    TiposIngresoQueries._dropTable(tx);
    TiposEgresoQueries._dropTable(tx);
    CategoriasEgresoQueries._dropTable(tx);
    CategoriasIngresoQueries._dropTable(tx);
    BancosQueries._dropTable(tx);
    DestinosEgresoQueries._dropTable(tx);
    DestinosIngresoQueries._dropTable(tx);
    EntidadesEmisorasQueries._dropTable(tx);
    EstadosPrestamoQueries._dropTable(tx);
    PeriodosQueries._dropTable(tx);
    TiposInversionQueries._dropTable(tx);
    TiposPrestamoQueries._dropTable(tx);

    UsuariosQueries._dropTable(tx);
    IngresosQueries._dropTable(tx);
    PresupuestosQueries._dropTable(tx);
    CuentasQueries._dropTable(tx);
  });
}

export {
  UsuariosQueries,
  IngresosQueries,
  EgresosQueries,
  PrestamosQueries,
  PresupuestosQueries,
  CuentasQueries,
  InversionesQueries,
  TarjetasQueries,
  MediosPagoQueries,
  TiposIngresoQueries,
  TiposEgresoQueries,
  CategoriasEgresoQueries
};