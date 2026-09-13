import React, { createContext, useContext, useState, useEffect } from 'react';
import { ItemCarrito, Producto, ExtraOpcion } from '../types';
import { APP_CONFIG } from '../config/appConfig';

interface CartContextType {
  items: ItemCarrito[];
  agregarAlCarrito: (producto: Producto, cantidad?: number, extras?: ExtraOpcion[], instrucciones?: string) => void;
  actualizarCantidad: (idItem: string, delta: number) => void;
  eliminarDelCarrito: (idItem: string) => void;
  vaciarCarrito: () => void;
  cantidadTotal: number;
  subtotal: number;
  costoEnvio: number;
  total: number;
  notaGeneral: string;
  setNotaGeneral: (nota: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ItemCarrito[]>(() => {
    try {
      const guardado = localStorage.getItem('el_pana_cart');
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  const [notaGeneral, setNotaGeneral] = useState<string>(() => {
    try {
      return localStorage.getItem('el_pana_cart_nota') || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('el_pana_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('el_pana_cart_nota', notaGeneral);
    } catch (e) {
      console.error(e);
    }
  }, [notaGeneral]);

  const agregarAlCarrito = (
    producto: Producto,
    cantidad: number = 1,
    extras: ExtraOpcion[] = [],
    instrucciones: string = ''
  ) => {
    const extrasTotal = extras.reduce((sum, ex) => sum + ex.precio, 0);
    const precioUnitario = producto.precio + extrasTotal;
    const precioTotalItem = precioUnitario * cantidad;

    // Check if exactly same item with same extras and instructions exists
    const extrasKey = extras.map(e => e.id).sort().join(',');
    const itemExistenteIndex = items.findIndex(
      it =>
        it.producto.id === producto.id &&
        it.extrasSeleccionados.map(e => e.id).sort().join(',') === extrasKey &&
        (it.instrucciones || '') === instrucciones
    );

    if (itemExistenteIndex > -1) {
      setItems(prev =>
        prev.map((it, idx) => {
          if (idx === itemExistenteIndex) {
            const nuevaCantidad = it.cantidad + cantidad;
            return {
              ...it,
              cantidad: nuevaCantidad,
              precioTotalItem: (it.producto.precio + extrasTotal) * nuevaCantidad,
            };
          }
          return it;
        })
      );
    } else {
      const nuevoItem: ItemCarrito = {
        idItem: `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        producto,
        cantidad,
        extrasSeleccionados: extras,
        instrucciones,
        precioTotalItem,
      };
      setItems(prev => [...prev, nuevoItem]);
    }
  };

  const actualizarCantidad = (idItem: string, delta: number) => {
    setItems(prev =>
      prev
        .map(it => {
          if (it.idItem === idItem) {
            const nuevaCantidad = it.cantidad + delta;
            if (nuevaCantidad <= 0) return null;
            const extrasTotal = it.extrasSeleccionados.reduce((sum, ex) => sum + ex.precio, 0);
            return {
              ...it,
              cantidad: nuevaCantidad,
              precioTotalItem: (it.producto.precio + extrasTotal) * nuevaCantidad,
            };
          }
          return it;
        })
        .filter((it): it is ItemCarrito => it !== null)
    );
  };

  const eliminarDelCarrito = (idItem: string) => {
    setItems(prev => prev.filter(it => it.idItem !== idItem));
  };

  const vaciarCarrito = () => {
    setItems([]);
    setNotaGeneral('');
  };

  const cantidadTotal = items.reduce((sum, it) => sum + it.cantidad, 0);
  const subtotal = items.reduce((sum, it) => sum + it.precioTotalItem, 0);
  const costoEnvio = subtotal >= APP_CONFIG.montoEnvioGratis || subtotal === 0 ? 0 : APP_CONFIG.costoEnvioBase;
  const total = subtotal + costoEnvio;

  return (
    <CartContext.Provider
      value={{
        items,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        cantidadTotal,
        subtotal,
        costoEnvio,
        total,
        notaGeneral,
        setNotaGeneral,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};
