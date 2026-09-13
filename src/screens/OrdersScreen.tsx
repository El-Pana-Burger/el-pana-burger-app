import React from 'react';
import {
  Clock,
  Navigation,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Bike,
  Package,
} from 'lucide-react';
import { useOrders } from '../context/OrdersContext';
import { useCart } from '../context/CartContext';
import { Pedido } from '../types';

interface OrdersScreenProps {
  onNavegar: (pantalla: string) => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({ onNavegar }) => {
  const { pedidos, seleccionarPedidoActivo } = useOrders();
  const { agregarAlCarrito } = useCart();

  const verSeguimiento = (pedido: Pedido) => {
    seleccionarPedidoActivo(pedido.id);
    onNavegar('tracking');
  };

  const repetirPedido = (pedido: Pedido) => {
    pedido.items.forEach(it => {
      agregarAlCarrito(it.producto, it.cantidad, it.extrasSeleccionados, it.instrucciones);
    });
    onNavegar('cart');
  };

  if (pedidos.length === 0) {
    return (
      <div id="screen-orders-empty" className="p-5 flex-1 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#181818] border border-[#262626] flex items-center justify-center text-3xl">
          🧾
        </div>
        <div>
          <h2 className="text-white text-xl font-black tracking-tight m-0">
            No tienes pedidos todavía
          </h2>
          <p className="text-[#888] text-xs max-w-[220px] mx-auto mt-1 leading-relaxed m-0">
            Pide una deliciosa hamburguesa o promo 2x20 para ver tu historial.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavegar('menu')}
          className="bg-[#F7B63F] hover:bg-[#e0a331] text-black font-black text-xs uppercase tracking-wider py-3 px-6 rounded-xl cursor-pointer"
        >
          VER LA CARTA
        </button>
      </div>
    );
  }

  return (
    <div id="screen-orders" className="p-4 pb-28 space-y-4 flex-1">
      {/* Header */}
      <div>
        <h2 className="text-white text-xl font-black tracking-tight m-0">
          Historial de Pedidos
        </h2>
        <p className="text-[#888] text-xs m-0">
          Consulta el estado y seguimiento de tus pedidos en El Pana Burger
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-3.5">
        {pedidos.map(pedido => {
          const esActivo = pedido.estado !== 'entregado';
          return (
            <div
              key={pedido.id}
              id={`order-card-${pedido.id}`}
              className={`rounded-2xl p-4 border transition-all space-y-3 shadow-md ${
                esActivo
                  ? 'bg-gradient-to-b from-[#1c180e] to-[#141414] border-[#F7B63F]/50 shadow-[#F7B63F]/5'
                  : 'bg-[#151515] border-[#222]'
              }`}
            >
              {/* Order Card Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-[#222]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-white">{pedido.id}</span>
                  <span className="text-[11px] text-[#777]">({pedido.fecha})</span>
                </div>

                <span
                  className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                    pedido.estado === 'entregado'
                      ? 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30'
                      : 'bg-[#F7B63F]/20 text-[#F7B63F] border border-[#F7B63F]/40 animate-pulse'
                  }`}
                >
                  {pedido.estado === 'recibido' && 'Confirmado'}
                  {pedido.estado === 'en_preparacion' && 'En Cocina'}
                  {pedido.estado === 'en_camino' && 'En Camino 🏍️'}
                  {pedido.estado === 'entregado' && 'Entregado ✓'}
                </span>
              </div>

              {/* Items Summary */}
              <div className="space-y-1">
                {pedido.items.map(it => (
                  <div key={it.idItem} className="flex justify-between text-xs text-[#ccc]">
                    <span className="truncate pr-2">
                      {it.cantidad}x {it.producto.nombre}
                    </span>
                    <span className="font-bold flex-shrink-0">
                      S/ {it.precioTotalItem.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery Address & Total */}
              <div className="pt-2 border-t border-[#222] flex items-center justify-between text-xs">
                <span className="text-[#888] truncate max-w-[200px]">
                  {pedido.cliente.direccion}
                </span>
                <span className="font-black text-sm text-[#F7B63F]">
                  Total: S/ {pedido.total.toFixed(2)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {esActivo ? (
                  <button
                    type="button"
                    onClick={() => verSeguimiento(pedido)}
                    className="col-span-2 bg-[#F7B63F] hover:bg-[#e0a331] text-black font-black py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-transform active:scale-95 cursor-pointer shadow-md"
                  >
                    <Bike size={16} />
                    <span>SEGUIMIENTO GPS EN VIVO</span>
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => verSeguimiento(pedido)}
                      className="bg-[#202020] hover:bg-[#282828] text-white border border-[#333] py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Navigation size={13} className="text-[#F7B63F]" />
                      <span>Ver Detalles</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => repetirPedido(pedido)}
                      className="bg-[#202020] hover:bg-[#282828] text-white border border-[#333] py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <RotateCcw size={13} className="text-[#22c55e]" />
                      <span>Repetir Pedido</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
