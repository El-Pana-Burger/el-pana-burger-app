import React from 'react';
import {
  Flame,
  Clock,
  Bike,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Plus,
  PhoneCall,
  MapPin,
  Zap,
} from 'lucide-react';
import heroBurgerImg from '../assets/images/hero_burger.jpg';
import comboImg from '../assets/images/combo_2x20.jpg';
import { Logo } from '../components/Logo';
import { APP_CONFIG } from '../config/appConfig';
import { PRODUCTOS } from '../data/products';
import { CATEGORIAS_RAPIDAS } from '../data/categories';
import { Producto, CategoriaTipo } from '../types';
import { useOrders } from '../context/OrdersContext';

interface HomeScreenProps {
  onNavegar: (pantalla: string) => void;
  onSeleccionarProducto: (producto: Producto) => void;
  onFiltrarCategoria: (categoria: CategoriaTipo) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavegar,
  onSeleccionarProducto,
  onFiltrarCategoria,
}) => {
  const { pedidoActivo } = useOrders();

  const pedirPromo = () => {
    const promo = PRODUCTOS.find(p => p.id === 'promo-2x20') || PRODUCTOS[0];
    onSeleccionarProducto(promo);
  };

  // 4 productos estrella distintos al producto destacado del hero (evita duplicados)
  const masPedidos = PRODUCTOS.filter(
    p => !p.esPromo && p.id !== 'hamburguesa-el-pana'
  ).slice(0, 4);

  return (
    <div id="screen-home" className="p-4 pb-28 space-y-5 flex-1">
      {/* Banner de Pedido Activo en Vivo si hay pedido en curso */}
      {pedidoActivo && pedidoActivo.estado !== 'entregado' && (
        <div
          id="banner-pedido-activo"
          onClick={() => onNavegar('tracking')}
          className="bg-gradient-to-r from-[#1c1404] via-[#2a1d08] to-[#1c1404] border-2 border-[#F7B63F] rounded-2xl p-3.5 shadow-xl shadow-[#F7B63F]/15 flex items-center justify-between cursor-pointer hover:scale-[1.01] transition-all group animate-in slide-in-from-top-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F7B63F] text-black flex items-center justify-center font-black shadow-md group-hover:rotate-6 transition-transform">
              <Bike size={22} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#F7B63F]">
                  PEDIDO #{pedidoActivo.id} EN CURSO
                </span>
              </div>
              <p className="text-white text-xs font-bold mt-0.5 m-0">
                {pedidoActivo.estado === 'recibido' && 'Confirmado en cocina'}
                {pedidoActivo.estado === 'en_preparacion' && 'En la parrilla con sazón'}
                {pedidoActivo.estado === 'en_camino' && `En camino con ${pedidoActivo.motorizado.nombre}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[#F7B63F] text-xs font-black">
            <span>Rastrear</span>
            <ArrowRight size={14} />
          </div>
        </div>
      )}

      {/* Logotipo Central Grande fuera del header */}
      <div id="hero-brand-logo" className="flex flex-col items-center justify-center pt-1 pb-1">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[#F7B63F]/25 rounded-full blur-2xl scale-125 pointer-events-none" />
          <Logo
            size="2xl"
            className="relative hover:scale-105 transition-transform drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)]"
          />
        </div>
      </div>

      {/* Slogan Central: "MÁS QUE HAMBURGUESAS, SOMOS SABOR" */}
      <div id="hero-slogan" className="text-center pt-1 pb-1 select-none">
        <h2 className="text-3xl sm:text-4xl font-bebas uppercase tracking-wide text-white leading-none m-0 drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
          MÁS QUE HAMBURGUESAS,
        </h2>
        <h3 className="text-3xl sm:text-4xl font-bebas uppercase tracking-wide text-[#F5A623] leading-none mt-1 m-0 drop-shadow-[0_3px_12px_rgba(245,166,35,0.4)]">
          SOMOS SABOR
        </h3>
      </div>

      {/* Hero Burger Principal Showcase */}
      <div
        id="hero-burger-showcase"
        onClick={() => {
          const burger = PRODUCTOS.find(p => p.id === 'hamburguesa-el-pana') || PRODUCTOS[0];
          onSeleccionarProducto(burger);
        }}
        className="relative flex items-center justify-center -my-2 cursor-pointer group"
      >
        {/* Resplandor de brasas y fuego */}
        <div className="absolute inset-0 max-w-[260px] mx-auto bg-gradient-to-t from-[#E53935]/30 via-[#F7B63F]/20 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
        <img
          src={heroBurgerImg}
          alt="Hamburguesa Gourmet El Pana"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const t = e.currentTarget;
            if (!t.src.endsWith('/hero_burger.jpg')) t.src = '/hero_burger.jpg';
          }}
          className="relative z-10 w-full max-w-[340px] h-auto object-contain rounded-2xl drop-shadow-[0_15px_30px_rgba(0,0,0,0.95)] group-hover:scale-[1.02] transition-transform duration-300"
        />
      </div>

      {/* Tarjeta de Promoción COMBO 2X20 + PEPSI GRATIS */}
      <div
        id="card-promo-2x20"
        onClick={pedirPromo}
        className="relative overflow-hidden rounded-3xl border border-[#7a1818] bg-gradient-to-r from-[#190404] via-[#0e0202] to-[#160404] p-4 sm:p-5 shadow-2xl shadow-black/90 cursor-pointer group hover:border-[#E53935]/80 transition-all hover:scale-[1.01]"
      >
        {/* Resplandor lateral rojo */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-[#E53935]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Badge "SÚPER OFERTA" estilo cómic/explosión en la esquina superior derecha */}
        <div className="absolute top-2.5 right-3 z-20">
          <div className="relative inline-flex items-center gap-1 bg-gradient-to-r from-[#E53935] via-[#D32F2F] to-[#F57C00] text-white font-black text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md shadow-lg shadow-[#E53935]/50 border border-[#ff8585]/40 transform -rotate-3 group-hover:rotate-0 transition-transform">
            <Sparkles size={11} className="text-yellow-200 animate-spin" />
            <span>SÚPER OFERTA</span>
          </div>
        </div>

        {/* Contenido en 2 columnas: Textos de oferta a la izquierda, combo foto a la derecha */}
        <div className="grid grid-cols-12 gap-2 items-center relative z-10">
          {/* Lado izquierdo: Tipografía promocional */}
          <div className="col-span-6 flex flex-col justify-center space-y-1">
            <span className="inline-block self-start border border-[#F7B63F]/70 text-[#F7B63F] rounded-full px-2 py-0.5 text-[8px] font-black tracking-[0.16em] uppercase">
              OFERTA ESPECIAL
            </span>

            <div className="pt-0.5">
              <span className="text-[#F5A623] font-black text-xs uppercase tracking-wider block leading-none">
                COMBO
              </span>
              <span className="text-white font-bebas text-4xl sm:text-5xl font-black tracking-normal leading-none block drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]">
                2X20
              </span>
              <span className="text-[#F5A623] font-black text-[11px] sm:text-xs uppercase tracking-wider block mt-0.5 leading-tight">
                + PEPSI GRATIS
              </span>
              <span className="text-[#aaa] text-[10px] block mt-1 leading-snug">
                2 Burgers clásicas con todo
              </span>
            </div>
          </div>

          {/* Lado derecho: Imagen de 2 hamburguesas + botella Pepsi 355ml */}
          <div className="col-span-6 relative flex items-center justify-center">
            <img
              src={comboImg}
              alt="Combo 2x20 con Pepsi Gratis"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const t = e.currentTarget;
                if (!t.src.endsWith('/combo_2x20.jpg')) t.src = '/combo_2x20.jpg';
              }}
              className="w-full h-auto max-h-[145px] object-cover rounded-xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Botón flotante de acción rápida dentro de la tarjeta */}
        <div className="mt-3 pt-2.5 border-t border-[#2d0a0a] flex items-center justify-between">
          <span className="text-[10px] text-[#bbb] font-bold">
            ¡Solo por S/ 20.00! Incluye bebidas
          </span>
          <span className="text-xs font-black text-[#F7B63F] group-hover:translate-x-1 transition-transform flex items-center gap-1">
            <span>Pedir Combo</span>
            <ArrowRight size={14} />
          </span>
        </div>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#121212]/75 backdrop-blur-xs border border-[#262020] rounded-xl p-2.5 flex flex-col items-center text-center">
          <Clock size={18} className="text-[#F7B63F] mb-1" />
          <span className="text-[11px] font-bold text-white">25-35 min</span>
          <span className="text-[9px] text-[#777]">Entrega rápida</span>
        </div>
        <div className="bg-[#121212]/75 backdrop-blur-xs border border-[#262020] rounded-xl p-2.5 flex flex-col items-center text-center">
          <Flame size={18} className="text-[#E53935] mb-1" />
          <span className="text-[11px] font-bold text-white">100% Carne</span>
          <span className="text-[9px] text-[#777]">Sabor a la leña</span>
        </div>
        <div className="bg-[#121212]/75 backdrop-blur-xs border border-[#262020] rounded-xl p-2.5 flex flex-col items-center text-center">
          <ShieldCheck size={18} className="text-[#22C55E] mb-1" />
          <span className="text-[11px] font-bold text-white">Yape / Plin</span>
          <span className="text-[9px] text-[#777]">O contra entrega</span>
        </div>
      </div>

      {/* Categorías Rápidas */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-white text-sm font-black uppercase tracking-wider m-0">
            Categorías
          </h3>
          <button
            type="button"
            onClick={() => onNavegar('menu')}
            className="text-[11px] text-[#F7B63F] hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>Ver toda la carta</span>
            <ArrowRight size={12} />
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {CATEGORIAS_RAPIDAS.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onFiltrarCategoria(cat.id)}
              className="bg-[#161616]/80 hover:bg-[#202020] active:scale-95 border border-[#2a2424] rounded-xl px-3 py-2 flex items-center gap-1.5 shrink-0 text-xs font-bold text-white transition-all cursor-pointer backdrop-blur-xs"
            >
              <span className="text-base">{cat.icono}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Los Más Pedidos */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Flame size={16} className="text-[#E53935]" />
            <h3 className="text-white text-sm font-black uppercase tracking-wider m-0">
              Los Más Pedidos
            </h3>
          </div>
          <span className="text-[10px] text-[#777]">Recomendados del chef</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {masPedidos.map(prod => (
            <div
              key={prod.id}
              id={`card-home-prod-${prod.id}`}
              onClick={() => onSeleccionarProducto(prod)}
              className="bg-[#121212]/80 backdrop-blur-xs border border-[#2a2020] hover:border-[#F7B63F]/40 rounded-2xl p-3 flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl filter drop-shadow">{prod.icono}</span>
                  {prod.badge && (
                    <span className="bg-[#E53935]/20 text-[#E53935] text-[9px] font-black px-1.5 py-0.5 rounded border border-[#E53935]/30 uppercase">
                      {prod.badge}
                    </span>
                  )}
                </div>
                <h4 className="text-white font-bold text-xs group-hover:text-[#F7B63F] transition-colors line-clamp-1 m-0">
                  {prod.nombre}
                </h4>
                <p className="text-[#888] text-[10px] line-clamp-2 mt-1 m-0">
                  {prod.descripcion}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#202020]">
                <div>
                  <span className="text-[9px] text-[#666] block leading-none">Precio</span>
                  <span className="text-[#F7B63F] font-black text-xs">
                    S/ {prod.precio.toFixed(2)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    onSeleccionarProducto(prod);
                  }}
                  className="w-7 h-7 rounded-lg bg-[#F7B63F] hover:bg-[#e0a331] active:scale-90 text-black flex items-center justify-center font-black transition-transform cursor-pointer"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ubicación y Horarios de Atención */}
      <div className="bg-[#121212]/80 backdrop-blur-xs border border-[#2a2020] rounded-2xl p-4 space-y-2.5">
        <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 m-0">
          <MapPin size={14} className="text-[#F7B63F]" />
          <span>Local & Horario de Delivery</span>
        </h4>
        <p className="text-[#888] text-[11px] leading-relaxed m-0">
          {APP_CONFIG.direccionLocal}
        </p>
        <div className="flex items-center justify-between pt-1 text-[11px] border-t border-[#1e1e1e]">
          <span className="text-[#bbb]">Atención diaria:</span>
          <span className="text-[#F7B63F] font-bold">{APP_CONFIG.horario}</span>
        </div>
      </div>
    </div>
  );
};
