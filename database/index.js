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

  MediosPagoQueries._createTable();
  TiposIngresoQueries._createTable();
  TiposEgresoQueries._createTable();
  CategoriasEgresoQueries._createTable();
  CategoriasIngresoQueries._createTable();
  BancosQueries._createTable();
  DestinosEgresoQueries._createTable();
  DestinosIngresoQueries._createTable();
  EntidadesEmisorasQueries._createTable();
  EstadosPrestamoQueries._createTable();
  PeriodosQueries._createTable();
  TiposInversionQueries._createTable();
  TiposPrestamoQueries._createTable();

  UsuariosQueries._createTable();
  IngresosQueries._createTable();
  PresupuestosQueries._createTable();
  CuentasQueries._createTable();
}

export function dropTables() {

  MediosPagoQueries._dropTable();
  TiposIngresoQueries._dropTable();
  TiposEgresoQueries._dropTable();
  CategoriasEgresoQueries._dropTable();
  CategoriasIngresoQueries._dropTable();
  BancosQueries._dropTable();
  DestinosEgresoQueries._dropTable();
  DestinosIngresoQueries._dropTable();
  EntidadesEmisorasQueries._dropTable();
  EstadosPrestamoQueries._dropTable();
  PeriodosQueries._dropTable();
  TiposInversionQueries._dropTable();
  TiposPrestamoQueries._dropTable();

  UsuariosQueries._dropTable();
  IngresosQueries._dropTable();
  PresupuestosQueries._dropTable();
  CuentasQueries._dropTable();
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