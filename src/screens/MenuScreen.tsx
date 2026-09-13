import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles, Filter, X } from 'lucide-react';
import { PRODUCTOS } from '../data/products';
import { TODAS_CATEGORIAS } from '../data/categories';
import { Producto, CategoriaTipo } from '../types';

interface MenuScreenProps {
  categoriaSeleccionada: CategoriaTipo;
  onCambiarCategoria: (categoria: CategoriaTipo) => void;
  onSeleccionarProducto: (producto: Producto) => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  categoriaSeleccionada,
  onCambiarCategoria,
  onSeleccionarProducto,
}) => {
  const [busqueda, setBusqueda] = useState('');

  const productosFiltrados = useMemo(() => {
    return PRODUCTOS.filter(p => {
      const coincideCategoria =
        categoriaSeleccionada === 'Todos' || p.categoria === categoriaSeleccionada;
      const coincideTexto =
        !busqueda.trim() ||
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(busqueda.toLowerCase());
      return coincideCategoria && coincideTexto;
    });
  }, [categoriaSeleccionada, busqueda]);

  return (
    <div id="screen-menu" className="p-4 pb-28 space-y-4 flex-1">
      {/* Title & Search Bar */}
      <div>
        <h2 className="text-white text-xl font-black tracking-tight m-0 mb-3">
          Nuestra Carta & Promos
        </h2>

        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777]" />
          <input
            id="input-buscar-menu"
            type="text"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar hamburguesa, pepito, promo..."
            className="w-full bg-[#151515] border border-[#262626] rounded-xl pl-10 pr-9 py-2.5 text-xs text-white placeholder-[#777] focus:outline-none focus:border-[#F7B63F]"
          />
          {busqueda && (
            <button
              type="button"
              onClick={() => setBusqueda('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777] hover:text-white cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Category Tabs */}
      <div
        id="tabs-categorias-menu"
        className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar -mx-4 px-4 scroll-smooth"
      >
        {TODAS_CATEGORIAS.map(cat => {
          const activa = categoriaSeleccionada === cat.id;
          return (
            <button
              key={cat.id}
              id={`tab-cat-${cat.id.toLowerCase()}`}
              type="button"
              onClick={() => onCambiarCategoria(cat.id)}
              className={`flex-shrink-0 px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer text-xs font-black ${
                activa
                  ? 'bg-[#F7B63F] text-black shadow-md shadow-[#F7B63F]/20'
                  : 'bg-[#151515] text-[#bbb] border border-[#242424] hover:border-[#383838]'
              }`}
            >
              <span className="text-base select-none">{cat.icono}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* List of Products */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between text-xs text-[#777]">
          <span>
            {categoriaSeleccionada === 'Todos' ? 'Mostrando todo el menú' : categoriaSeleccionada}
          </span>
          <span>{productosFiltrados.length} opciones disponibles</span>
        </div>

        {productosFiltrados.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <span className="text-4xl block">🔍</span>
            <p className="text-white font-bold text-sm">No encontramos resultados para "{busqueda}"</p>
            <p className="text-[#777] text-xs">Intenta con otro término o selecciona otra categoría.</p>
            <button
              type="button"
              onClick={() => {
                setBusqueda('');
                onCambiarCategoria('Todos');
              }}
              className="mt-2 bg-[#222] text-[#F7B63F] text-xs font-bold py-2 px-4 rounded-xl border border-[#333] cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          productosFiltrados.map(producto => (
            <div
              key={producto.id}
              id={`menu-item-${producto.id}`}
              onClick={() => onSeleccionarProducto(producto)}
              className="bg-[#151515] hover:bg-[#1a1a1a] rounded-2xl p-3.5 border border-[#222] hover:border-[#333] transition-all flex items-center gap-3.5 cursor-pointer group shadow-sm"
            >
              {/* Icon / Image */}
              <div className="w-[74px] h-[74px] rounded-xl bg-[#202020] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform relative overflow-hidden">
                <span className="text-3xl select-none">{producto.icono}</span>
                {producto.esPromo && (
                  <span className="absolute bottom-0 inset-x-0 bg-[#E53935] text-[8px] font-black text-white text-center py-0.5 uppercase tracking-tighter">
                    PROMO
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {producto.badge && (
                    <span className="text-[9px] font-black bg-[#E53935]/20 text-[#E53935] border border-[#E53935]/30 px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                      {producto.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-white text-[15px] font-black tracking-tight truncate mt-0.5 m-0">
                  {producto.nombre}
                </h3>
                <p className="text-[#888] text-[11px] line-clamp-2 mt-0.5 leading-relaxed m-0">
                  {producto.descripcion}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-[#F7B63F] font-black text-sm m-0">
                    S/ {producto.precio.toFixed(2)}
                  </p>
                  <span className="text-[10px] text-[#666] font-bold group-hover:text-[#F7B63F] transition-colors">
                    Personalizar →
                  </span>
                </div>
              </div>

              {/* Add Button */}
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  onSeleccionarProducto(producto);
                }}
                aria-label={`Personalizar o agregar ${producto.nombre}`}
                className="w-9 h-9 rounded-xl bg-[#F7B63F] hover:bg-[#e0a331] active:scale-90 text-black flex items-center justify-center font-black transition-all cursor-pointer shadow-md flex-shrink-0"
              >
                <Plus size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
