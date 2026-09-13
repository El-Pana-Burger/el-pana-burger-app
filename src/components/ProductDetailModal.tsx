import React, { useState } from 'react';
import { X, Plus, Minus, Check, Sparkles, MessageSquare } from 'lucide-react';
import { Producto, ExtraOpcion } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  producto: Producto | null;
  abierto: boolean;
  onCerrar: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  producto,
  abierto,
  onCerrar,
}) => {
  const { agregarAlCarrito } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [extrasSeleccionados, setExtrasSeleccionados] = useState<ExtraOpcion[]>([]);
  const [instrucciones, setInstrucciones] = useState('');
  const [agregadoAnim, setAgregadoAnim] = useState(false);

  if (!abierto || !producto) return null;

  const toggleExtra = (extra: ExtraOpcion) => {
    setExtrasSeleccionados(prev => {
      const existe = prev.some(e => e.id === extra.id);
      if (existe) {
        return prev.filter(e => e.id !== extra.id);
      } else {
        return [...prev, extra];
      }
    });
  };

  const precioExtras = extrasSeleccionados.reduce((sum, e) => sum + e.precio, 0);
  const precioUnitario = producto.precio + precioExtras;
  const precioTotal = precioUnitario * cantidad;

  const handleAgregar = () => {
    agregarAlCarrito(producto, cantidad, extrasSeleccionados, instrucciones);
    setAgregadoAnim(true);
    setTimeout(() => {
      setAgregadoAnim(false);
      setCantidad(1);
      setExtrasSeleccionados([]);
      setInstrucciones('');
      onCerrar();
    }, 400);
  };

  return (
    <div
      id="modal-producto-backdrop"
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onCerrar}
    >
      <div
        id="modal-producto-content"
        className="w-full max-w-md bg-[#111111] border-t sm:border border-[#2a2a2a] rounded-t-[30px] sm:rounded-3xl max-h-[90vh] flex flex-col p-5 shadow-2xl animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#222]">
          <div className="flex items-center gap-2">
            <span className="text-3xl select-none">{producto.icono}</span>
            <div>
              {producto.badge && (
                <span className="text-[10px] font-extrabold bg-[#E53935] text-white px-2 py-0.5 rounded-full inline-block mb-1">
                  {producto.badge}
                </span>
              )}
              <h3 className="text-white text-lg font-black tracking-tight leading-tight m-0">
                {producto.nombre}
              </h3>
            </div>
          </div>

          <button
            id="btn-close-product-modal"
            type="button"
            onClick={onCerrar}
            className="w-9 h-9 rounded-xl bg-[#202020] hover:bg-[#2a2a2a] text-[#888] hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-[#2a2a2a]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto max-h-[58vh] pr-1 py-3 space-y-4">
          {/* Imagen destacada sin fondo si es Hamburguesa El Pana */}
          {producto.id === 'hamburguesa-el-pana' && (
            <div className="relative flex items-center justify-center py-1">
              <div className="absolute inset-0 max-w-[160px] mx-auto bg-[#F7B63F]/20 rounded-full blur-xl pointer-events-none" />
              <img
                src="/hero_burger.png"
                alt={producto.nombre}
                referrerPolicy="no-referrer"
                className="relative z-10 w-44 h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)]"
              />
            </div>
          )}

          {/* Descripción */}
          <p className="text-[#bbb] text-xs leading-relaxed">
            {producto.descripcion}
          </p>

          {/* Ingredientes */}
          {producto.ingredientes && producto.ingredientes.length > 0 && (
            <div className="bg-[#171717] rounded-xl p-3 border border-[#242424]">
              <span className="text-[11px] font-bold text-[#888] uppercase tracking-wider block mb-2">
                Ingredientes incluidos:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {producto.ingredientes.map((ing, i) => (
                  <span
                    key={i}
                    className="text-[11px] bg-[#222] text-[#ddd] px-2.5 py-1 rounded-lg font-medium border border-[#2e2e2e]"
                  >
                    ✓ {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Extras / Adicionales */}
          {producto.extrasDisponibles && producto.extrasDisponibles.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-white uppercase tracking-wider">
                  ¿Deseas agregar extras?
                </span>
                <span className="text-[11px] text-[#888]">Opcional</span>
              </div>

              <div className="space-y-2">
                {producto.extrasDisponibles.map(extra => {
                  const seleccionado = extrasSeleccionados.some(e => e.id === extra.id);
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer text-left ${
                        seleccionado
                          ? 'bg-[#F7B63F]/15 border-[#F7B63F] text-white'
                          : 'bg-[#181818] border-[#262626] text-[#ccc] hover:border-[#3a3a3a]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            seleccionado
                              ? 'bg-[#F7B63F] border-[#F7B63F] text-black'
                              : 'border-[#444] bg-transparent'
                          }`}
                        >
                          {seleccionado && <Check size={14} className="stroke-[3]" />}
                        </div>
                        <span className="text-xs font-bold">{extra.nombre}</span>
                      </div>
                      <span className="text-xs font-extrabold text-[#F7B63F]">
                        + S/ {extra.precio.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Instrucciones especiales */}
          <div>
            <label htmlFor="modal-instrucciones" className="flex items-center gap-1.5 text-xs font-bold text-[#888] mb-1.5">
              <MessageSquare size={14} />
              Instrucciones especiales para cocina (Opcional):
            </label>
            <textarea
              id="modal-instrucciones"
              rows={2}
              value={instrucciones}
              onChange={e => setInstrucciones(e.target.value)}
              placeholder="Ej: Sin cebolla, tártara bien fría, carne término medio..."
              className="w-full bg-[#181818] border border-[#2a2a2a] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#F7B63F] resize-none"
            />
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="pt-3 border-t border-[#222] mt-auto flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center gap-2 bg-[#1a1a1a] p-1.5 rounded-xl border border-[#2a2a2a] flex-shrink-0">
            <button
              id="btn-modal-qty-minus"
              type="button"
              onClick={() => setCantidad(c => Math.max(1, c - 1))}
              disabled={cantidad <= 1}
              aria-label="Restar cantidad"
              className="w-8 h-8 rounded-lg bg-[#282828] hover:bg-[#333] disabled:opacity-40 text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
            >
              <Minus size={14} />
            </button>
            <span className="text-white font-black text-sm w-6 text-center">
              {cantidad}
            </span>
            <button
              id="btn-modal-qty-plus"
              type="button"
              onClick={() => setCantidad(c => c + 1)}
              aria-label="Sumar cantidad"
              className="w-8 h-8 rounded-lg bg-[#282828] hover:bg-[#333] text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            id="btn-modal-add-to-cart"
            type="button"
            onClick={handleAgregar}
            className={`flex-1 font-black py-3 px-4 rounded-xl transition-all cursor-pointer text-xs uppercase tracking-wider flex items-center justify-between shadow-lg ${
              agregadoAnim
                ? 'bg-[#22C55E] text-black scale-95'
                : 'bg-[#F7B63F] hover:bg-[#e0a331] active:scale-[0.99] text-black shadow-[#F7B63F]/15'
            }`}
          >
            <span>{agregadoAnim ? '¡Agregado!' : 'Agregar'}</span>
            <span className="text-sm font-black">
              S/ {precioTotal.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
