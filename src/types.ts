export type CategoriaTipo = 'Todos' | 'Promos' | 'Hamburguesas' | 'Perros' | 'Pepitos' | 'Acompañamientos' | 'Bebidas';

export interface ExtraOpcion {
  id: string;
  nombre: string;
  precio: number;
}

export interface Producto {
  id: string;
  nombre: string;
  categoria: CategoriaTipo;
  precio: number;
  icono: string;
  descripcion: string;
  badge?: string;
  esPromo?: boolean;
  ingredientes?: string[];
  extrasDisponibles?: ExtraOpcion[];
}

export interface ItemCarrito {
  idItem: string; // unique item instance id
  producto: Producto;
  cantidad: number;
  extrasSeleccionados: ExtraOpcion[];
  instrucciones?: string;
  precioTotalItem: number;
}

export type MetodoPago = 'yape' | 'plin' | 'efectivo' | 'tarjeta';

export type EstadoPedido = 'recibido' | 'en_preparacion' | 'en_camino' | 'entregado';

export interface MotorizadoInfo {
  nombre: string;
  telefono: string;
  vehiculo: string;
  placa: string;
  calificacion: number;
}

export interface Pedido {
  id: string; // e.g. EP-4821
  codigoVerificacion: string; // e.g. 8492
  fecha: string;
  items: ItemCarrito[];
  subtotal: number;
  costoEnvio: number;
  total: number;
  metodoPago: MetodoPago;
  montoEfectivo?: number;
  vueltoRequerido?: number;
  estado: EstadoPedido;
  cliente: {
    nombre: string;
    telefono: string;
    direccion: string;
    referencia?: string;
  };
  motorizado: MotorizadoInfo;
  tiempoEstimadoMinutos: number;
  coordenadasProgreso: number; // 0 to 100 for GPS simulation
}

export interface UsuarioPerfil {
  nombre: string;
  telefono: string;
  direccion: string;
  referencia: string;
}
