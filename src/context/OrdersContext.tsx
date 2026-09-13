import React, { createContext, useContext, useState, useEffect } from 'react';
import { Pedido, EstadoPedido, MotorizadoInfo } from '../types';

interface OrdersContextType {
  pedidos: Pedido[];
  pedidoActivo: Pedido | null;
  crearPedido: (pedido: Omit<Pedido, 'id' | 'codigoVerificacion' | 'fecha' | 'estado' | 'motorizado' | 'tiempoEstimadoMinutos' | 'coordenadasProgreso'>) => Pedido;
  actualizarEstadoPedido: (idPedido: string, nuevoEstado: EstadoPedido) => void;
  seleccionarPedidoActivo: (idPedido: string) => void;
  verificarCodigoEntrega: (idPedido: string, codigo: string) => boolean;
}

const MOTORIZADOS_POOL: MotorizadoInfo[] = [
  {
    nombre: 'Carlos Mendoza',
    telefono: '+51 912 345 678',
    vehiculo: 'Moto Honda CB125 - Roja',
    placa: '5421-3A',
    calificacion: 4.9,
  },
  {
    nombre: 'Brayan Silva',
    telefono: '+51 923 888 112',
    vehiculo: 'Moto Yamaha FZ - Negra',
    placa: '8910-4B',
    calificacion: 4.8,
  },
];

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>(() => {
    try {
      const guardado = localStorage.getItem('el_pana_pedidos');
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  const [pedidoActivoId, setPedidoActivoId] = useState<string | null>(() => {
    try {
      return localStorage.getItem('el_pana_pedido_activo_id');
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('el_pana_pedidos', JSON.stringify(pedidos));
    } catch (e) {
      console.error(e);
    }
  }, [pedidos]);

  useEffect(() => {
    if (pedidoActivoId) {
      localStorage.setItem('el_pana_pedido_activo_id', pedidoActivoId);
    } else {
      localStorage.removeItem('el_pana_pedido_activo_id');
    }
  }, [pedidoActivoId]);

  // Active tracking timer simulation
  useEffect(() => {
    const pedidoActivo = pedidos.find(p => p.id === pedidoActivoId);
    if (!pedidoActivo || pedidoActivo.estado === 'entregado') return;

    const interval = setInterval(() => {
      setPedidos(prev =>
        prev.map(p => {
          if (p.id !== pedidoActivoId || p.estado === 'entregado') return p;

          let nuevoProgreso = p.coordenadasProgreso + 4;
          let nuevoEstado: EstadoPedido = p.estado;
          let nuevoTiempo = Math.max(1, p.tiempoEstimadoMinutos - 1);

          if (nuevoProgreso >= 25 && p.estado === 'recibido') {
            nuevoEstado = 'en_preparacion';
          }
          if (nuevoProgreso >= 55 && p.estado === 'en_preparacion') {
            nuevoEstado = 'en_camino';
          }
          if (nuevoProgreso >= 100) {
            nuevoProgreso = 100;
            nuevoEstado = 'entregado';
            nuevoTiempo = 0;
          }

          return {
            ...p,
            coordenadasProgreso: nuevoProgreso,
            estado: nuevoEstado,
            tiempoEstimadoMinutos: nuevoTiempo,
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [pedidoActivoId, pedidos]);

  const crearPedido = (datos: Omit<Pedido, 'id' | 'codigoVerificacion' | 'fecha' | 'estado' | 'motorizado' | 'tiempoEstimadoMinutos' | 'coordenadasProgreso'>): Pedido => {
    const idNumero = Math.floor(1000 + Math.random() * 9000);
    const codigoPin = Math.floor(1000 + Math.random() * 9000).toString();
    const motorizadoAleatorio = MOTORIZADOS_POOL[Math.floor(Math.random() * MOTORIZADOS_POOL.length)];

    const nuevoPedido: Pedido = {
      ...datos,
      id: `EP-${idNumero}`,
      codigoVerificacion: codigoPin,
      fecha: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: true }),
      estado: 'recibido',
      motorizado: motorizadoAleatorio,
      tiempoEstimadoMinutos: 25,
      coordenadasProgreso: 5,
    };

    setPedidos(prev => [nuevoPedido, ...prev]);
    setPedidoActivoId(nuevoPedido.id);
    return nuevoPedido;
  };

  const actualizarEstadoPedido = (idPedido: string, nuevoEstado: EstadoPedido) => {
    setPedidos(prev =>
      prev.map(p => (p.id === idPedido ? { ...p, estado: nuevoEstado } : p))
    );
  };

  const seleccionarPedidoActivo = (idPedido: string) => {
    setPedidoActivoId(idPedido);
  };

  const verificarCodigoEntrega = (idPedido: string, codigo: string): boolean => {
    const pedido = pedidos.find(p => p.id === idPedido);
    if (!pedido) return false;
    if (pedido.codigoVerificacion.trim() === codigo.trim()) {
      actualizarEstadoPedido(idPedido, 'entregado');
      setPedidos(prev =>
        prev.map(p => (p.id === idPedido ? { ...p, estado: 'entregado', coordenadasProgreso: 100, tiempoEstimadoMinutos: 0 } : p))
      );
      return true;
    }
    return false;
  };

  const pedidoActivo = pedidos.find(p => p.id === pedidoActivoId) || pedidos[0] || null;

  return (
    <OrdersContext.Provider
      value={{
        pedidos,
        pedidoActivo,
        crearPedido,
        actualizarEstadoPedido,
        seleccionarPedidoActivo,
        verificarCodigoEntrega,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = (): OrdersContextType => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders debe usarse dentro de OrdersProvider');
  }
  return context;
};
