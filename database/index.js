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
import * as NotificacionesQueries from './Queries/NotificacionesQueries';

export function createTables() {

  //Abro una transacción para crear las tablas y llenarlas con datos..
  DataBase._createTransaction((tx) => {

    /* Intento crear la tabla de usuarios, 
     * Si pudo es porque no existía y luego creo las demás tablas
     * Si NO pudo es porque las tablas ya fueron creadas */
    UsuariosQueries._createTable(tx, () => {

      UsuariosQueries._insertTx(tx, { email: 'usuario.test@uade.edu.ar', nombre: 'Test', apellido: 'Usuario', password: '123456' });

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

      CuentasQueries._createTable(tx, () => {
        CuentasQueries._insertTx(tx, { 
          idUsuario: 1, 
          idBanco: 1, 
          idEntidadEmisora: 1, 
          cbu: '4568589632369966501251',
          alias: 'TORTUGA.LENTES.FUEGO', 
          descripcion: 'Cuenta principal', 
          monto: 80550.99,
          tarjeta: 4568,
          vencimiento: '2021-05-01'
        });

        CuentasQueries._insertTx(tx, { 
          idUsuario: 1, 
          idBanco: 2, 
          idEntidadEmisora: 2, 
          cbu: '6798589892369966501672', 
          alias: 'LEON.AZUL.TRIGO', 
          descripcion: 'Cuenta secundaria', 
          monto: 300,
          tarjeta: 8544,
          vencimiento: '2022-04-01'
        });

        CuentasQueries._insertTx(tx, { 
          idUsuario: 1, 
          idBanco: 3, 
          idEntidadEmisora: 3, 
          cbu: '1118589892333366501444', 
          alias: 'CALAVERA.LAPIZ.TOMATE', 
          descripcion: 'Cuenta terciaria', 
          monto: 75900,
          tarjeta: 2242,
          vencimiento: '2025-02-01'
        });
      });

      TarjetasQueries._createTable(tx, () => {
        TarjetasQueries._insertTx(tx, { 
          idUsuario: 1, 
          idBanco: 1, 
          idEntidadEmisora: 1, 
          tarjeta: 1234, 
          vencimiento: '2023-10-29',
          cierreResumen: '2020-09-28',
          vencimientoResumen: '2020-10-03'
        });

        TarjetasQueries._insertTx(tx, { 
          idUsuario: 1, 
          idBanco: 2, 
          idEntidadEmisora: 2, 
          tarjeta: 4443, 
          vencimiento: '2025-10-19',
          cierreResumen: '2020-10-19',
          vencimientoResumen: '2020-10-21',
        });

        TarjetasQueries._insertTx(tx, { 
          idUsuario: 1, 
          idBanco: 3, 
          idEntidadEmisora: 3,
          tarjeta: 5647, 
          vencimiento: '2021-11-04',
          cierreResumen: '2020-11-02',
          vencimientoResumen: '2020-11-07',
        });
      });

      "(idUsuario, idTipoEgreso, idCategoriaEgreso, idCuenta, idTarjeta, idMedioPago, fecha, monto, detalleEgreso, cuotas) " +

      EgresosQueries._createTable(tx, () => {

        EgresosQueries._insertTx(tx, {
          idUsuario: 1,
          idTipoEgreso: 2,
          idCategoriaEgreso: null,
          idCuenta: null,
          idTarjeta: null,
          idMedioPago: 1,
          fecha: '2020-09-29',
          monto: 500,
          detalleEgreso: 'A...',
          cuotas: null
        });

        EgresosQueries._insertTx(tx, {
          idUsuario: 1,
          idTipoEgreso: 2,
          idCategoriaEgreso: null,
          idCuenta: null,
          idTarjeta: null,
          idMedioPago: 1,
          fecha: '2020-09-27',
          monto: 1000,
          detalleEgreso: 'B...',
          cuotas: null
        });

        EgresosQueries._insertTx(tx, {
          idUsuario: 1,
          idTipoEgreso: 2,
          idCategoriaEgreso: null,
          idCuenta: null,
          idTarjeta: null,
          idMedioPago: 1,
          fecha: '2020-09-28',
          monto: 3000,
          detalleEgreso: 'C...',
          cuotas: null
        });

        EgresosQueries._insertTx(tx, {
          idUsuario: 1,
          idTipoEgreso: 1,
          idCategoriaEgreso: 3,
          idCuenta: 1,
          idTarjeta: null,
          idMedioPago: 3,
          fecha: '2020-09-29',
          monto: 5500,
          detalleEgreso: 'D...',
          cuotas: null
        });

        EgresosQueries._insertTx(tx, {
          idUsuario: 1,
          idTipoEgreso: 1,
          idCategoriaEgreso: 3,
          idCuenta: null,
          idTarjeta: 1,
          idMedioPago: 2,
          fecha: '2020-09-24',
          monto: 5500,
          detalleEgreso: 'E...',
          cuotas: 1
        });
      });
      
      IngresosQueries._createTable(tx, () => {
        
        IngresosQueries._insertTx(tx, {
          idUsuario: 1,
          idTipoIngreso: 1,
          idCategoriaIngreso: 1,
          idDestinoIngreso: 1,
          idCuenta: 1,
          fecha: '2020-09-29',
          monto: 5563.69,
          descripcion: 'A..'
        });

        IngresosQueries._insertTx(tx, {
          idUsuario: 1,
          idTipoIngreso: 2,
          idCategoriaIngreso: null,
          idDestinoIngreso: 1,
          idCuenta: 1,
          fecha: '2020-09-23',
          monto: 559.78,
          descripcion: 'B..'
        });

        IngresosQueries._insertTx(tx, {
          idUsuario: 1,
          idTipoIngreso: 2,
          idCategoriaIngreso: null,
          idDestinoIngreso: 2,
          idCuenta: null,
          fecha: '2020-09-24',
          monto: 1111.65,
          descripcion: 'C..'
        });

        IngresosQueries._insertTx(tx, {
          idUsuario: 1,
          idTipoIngreso: 1,
          idCategoriaIngreso: 3,
          idDestinoIngreso: 2,
          idCuenta: null,
          fecha: '2020-09-23',
          monto: 6734.59,
          descripcion: 'D..'
        });

        IngresosQueries._insertTx(tx, {
          idUsuario: 1,
          idTipoIngreso: 1,
          idCategoriaIngreso: 4,
          idDestinoIngreso: 2,
          idCuenta: null,
          fecha: '2020-10-01',
          monto: 44.30,
          descripcion: 'E..'
        });

        IngresosQueries._insertTx(tx, {
          idUsuario: 1,
          idTipoIngreso: 1,
          idCategoriaIngreso: 2,
          idDestinoIngreso: 1,
          idCuenta: 2,
          fecha: '2020-09-29',
          monto: 56778.69,
          descripcion: 'F..'
        });

        IngresosQueries._insertTx(tx, {
          idUsuario: 1,
          idTipoIngreso: 1,
          idCategoriaIngreso: 3,
          idDestinoIngreso: 1,
          idCuenta: 2,
          fecha: '2020-09-26',
          monto: 7.99,
          descripcion: 'G..'
        });

        IngresosQueries._insertTx(tx, {
          idUsuario: 1,
          idTipoIngreso: 1,
          idCategoriaIngreso: 1,
          idDestinoIngreso: 1,
          idCuenta: 3,
          fecha: '2020-09-27',
          monto: 4444.23,
          descripcion: 'H..'
        });
      });

      PrestamosQueries._createTable(tx);
      PresupuestosQueries._createTable(tx);
      InversionesQueries._createTable(tx);
      NotificacionesQueries._createTable(tx);
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
    EgresosQueries._dropTable(tx);
    IngresosQueries._dropTable(tx);
    PrestamosQueries._dropTable(tx);
    PresupuestosQueries._dropTable(tx);
    InversionesQueries._dropTable(tx);
    CuentasQueries._dropTable(tx);
    TarjetasQueries._dropTable(tx);
    NotificacionesQueries._dropTable(tx);
  });
}

export {
  DataBase,
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
  CategoriasEgresoQueries,
  NotificacionesQueries
};