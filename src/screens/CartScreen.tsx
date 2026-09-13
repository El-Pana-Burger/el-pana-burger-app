import React from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { APP_CONFIG } from '../config/appConfig';

interface CartScreenProps {
  onNavegar: (pantalla: string) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({ onNavegar }) => {
  const {
    items,
    actualizarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    subtotal,
    costoEnvio,
    total,
    notaGeneral,
    setNotaGeneral,
  } = useCart();

  const faltaParaEnvioGratis = Math.max(0, APP_CONFIG.montoEnvioGratis - subtotal);
  const porcentajeEnvioGratis = Math.min(100, (subtotal / APP_CONFIG.montoEnvioGratis) * 100);

  if (items.length === 0) {
    return (
      <div id="cart-screen-empty" className="p-5 flex-1 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-[#181818] border border-[#262626] flex items-center justify-center text-4xl mb-1 shadow-inner">
          🛒
        </div>
        <div>
          <h2 className="text-white text-xl font-black tracking-tight m-0">
            Tu carrito está vacío
          </h2>
          <p className="text-[#888] text-xs max-w-[240px] mx-auto mt-1.5 leading-relaxed m-0">
            Aún no has agregado ninguna hamburguesa o pepito para tu pedido.
          </p>
        </div>

        <button
          id="btn-cart-empty-go-menu"
          type="button"
          onClick={() => onNavegar('menu')}
          className="bg-[#F7B63F] hover:bg-[#e0a331] text-black font-black text-xs uppercase tracking-wider py-3.5 px-6 rounded-2xl shadow-lg shadow-[#F7B63F]/15 transition-transform active:scale-95 cursor-pointer mt-2"
        >
          VER LA CARTA Y PEDIR
        </button>
      </div>
    );
  }

  return (
    <div id="screen-cart" className="p-4 pb-32 space-y-4 flex-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-xl font-black tracking-tight m-0">
            Tu Pedido
          </h2>
          <p className="text-[#888] text-xs m-0">
            {items.length} {items.length === 1 ? 'producto' : 'productos distintos'}
          </p>
        </div>

        <button
          id="btn-vaciar-carrito"
          type="button"
          onClick={vaciarCarrito}
          className="text-xs text-[#E53935] hover:underline font-bold flex items-center gap-1 cursor-pointer"
        >
          <Trash2 size={13} />
          Vaciar todo
        </button>
      </div>

      {/* Free Delivery Progress */}
      <div className="bg-[#141414] border border-[#242424] rounded-2xl p-3.5 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <Truck size={15} className="text-[#F7B63F]" />
            <span>
              {faltaParaEnvioGratis === 0 ? (
                <span className="text-[#22C55E]">¡Envío GRATIS alcanzado! 🎉</span>
              ) : (
                `Agrega S/ ${faltaParaEnvioGratis.toFixed(2)} más para envío GRATIS`
              )}
            </span>
          </div>
          <span className="text-[11px] text-[#888] font-bold">
            Meta: S/ {APP_CONFIG.montoEnvioGratis.toFixed(2)}
          </span>
        </div>

        <div className="w-full bg-[#222] h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#F7B63F] to-[#22C55E] h-full transition-all duration-300"
            style={{ width: `${porcentajeEnvioGratis}%` }}
          />
        </div>
      </div>

      {/* Cart Items List */}
      <div className="space-y-3">
        {items.map(item => (
          <div
            key={item.idItem}
            className="bg-[#151515] border border-[#222222] rounded-2xl p-3.5 flex items-start gap-3 shadow-sm"
          >
            <div className="w-14 h-14 rounded-xl bg-[#202020] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0 text-2xl select-none">
              {item.producto.icono}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-white text-sm font-black tracking-tight leading-tight m-0">
                  {item.producto.nombre}
                </h3>
                <button
                  type="button"
                  onClick={() => eliminarDelCarrito(item.idItem)}
                  className="text-[#666] hover:text-[#E53935] transition-colors p-1 cursor-pointer"
                  aria-label="Eliminar producto"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Extras list if selected */}
              {item.extrasSeleccionados && item.extrasSeleccionados.length > 0 && (
                <div className="mt-1 space-y-0.5">
                  {item.extrasSeleccionados.map(ex => (
                    <span
                      key={ex.id}
                      className="inline-block text-[10px] bg-[#222] text-[#F7B63F] font-bold px-2 py-0.5 rounded-md mr-1 border border-[#303030]"
                    >
                      +{ex.nombre} (+S/ {ex.precio.toFixed(2)})
                    </span>
                  ))}
                </div>
              )}

              {/* Special instruction if present */}
              {item.instrucciones && (
                <p className="text-[#888] text-[10px] italic mt-1 m-0">
                  Nota: "{item.instrucciones}"
                </p>
              )}

              <div className="flex items-center justify-between mt-2.5">
                <span className="text-sm font-black text-[#F7B63F]">
                  S/ {item.precioTotalItem.toFixed(2)}
                </span>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5 bg-[#1f1f1f] p-1 rounded-xl border border-[#2c2c2c]">
                  <button
                    type="button"
                    onClick={() => actualizarCantidad(item.idItem, -1)}
                    aria-label="Disminuir"
                    className="w-7 h-7 rounded-lg bg-[#2a2a2a] hover:bg-[#333] text-white flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-white font-black text-xs w-5 text-center">
                    {item.cantidad}
                  </span>
                  <button
                    type="button"
                    onClick={() => actualizarCantidad(item.idItem, 1)}
                    aria-label="Aumentar"
                    className="w-7 h-7 rounded-lg bg-[#2a2a2a] hover:bg-[#333] text-white flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* General order note */}
      <div className="bg-[#141414] border border-[#222] rounded-2xl p-3.5 space-y-1.5">
        <label htmlFor="input-nota-carrito" className="flex items-center gap-1.5 text-xs font-bold text-[#888]">
          <MessageSquare size={13} />
          Nota para el restaurante (salsas extra, servilletas, etc.):
        </label>
        <input
          id="input-nota-carrito"
          type="text"
          value={notaGeneral}
          onChange={e => setNotaGeneral(e.target.value)}
          placeholder="Ej: Enviar abundante salsa tártara y picante por favor"
          className="w-full bg-[#1b1b1b] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#F7B63F]"
        />
      </div>

      {/* Cost Breakdown */}
      <div className="bg-[#141414] border border-[#242424] rounded-2xl p-4 space-y-2.5">
        <div className="flex justify-between text-xs text-[#aaa]">
          <span>Subtotal de productos</span>
          <span className="font-bold text-white">S/ {subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-xs text-[#aaa]">
          <div className="flex items-center gap-1">
            <span>Costo de Delivery</span>
            {costoEnvio === 0 && (
              <span className="text-[10px] bg-[#22C55E]/15 text-[#22C55E] font-bold px-1.5 rounded">
                GRATIS
              </span>
            )}
          </div>
          <span className="font-bold text-white">
            {costoEnvio === 0 ? 'S/ 0.00' : `S/ ${costoEnvio.toFixed(2)}`}
          </span>
        </div>

        <div className="pt-2.5 border-t border-[#222] flex justify-between items-center">
          <span className="text-white font-black text-sm uppercase tracking-wider">
            TOTAL A PAGAR
          </span>
          <span className="text-[#F7B63F] font-black text-2xl">
            S/ {total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Proceed to Checkout Button */}
      <div className="pt-2">
        <button
          id="btn-ir-al-checkout"
          type="button"
          onClick={() => onNavegar('checkout')}
          className="w-full bg-[#F7B63F] hover:bg-[#e0a331] active:scale-[0.99] text-black font-black py-4 px-5 rounded-2xl transition-all cursor-pointer text-xs uppercase tracking-wider shadow-xl shadow-[#F7B63F]/20 flex items-center justify-between"
        >
          <span>CONTINUAR AL CHECKOUT</span>
          <span className="flex items-center gap-1 font-black text-sm">
            S/ {total.toFixed(2)} <ArrowRight size={16} />
          </span>
        </button>
      </div>
    </div>
  );
};
