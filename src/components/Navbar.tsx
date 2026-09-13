import React, { useState } from 'react';
import { Menu, ShoppingBag, ArrowLeft, Bell, Flame, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { APP_CONFIG } from '../config/appConfig';
import { Logo } from './Logo';

interface NavbarProps {
  pantallaActual: string;
  onAbrirMenu: () => void;
  onNavegar: (pantalla: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  pantallaActual,
  onAbrirMenu,
  onNavegar,
}) => {
  const { cantidadTotal } = useCart();
  const esSubpantalla = pantallaActual !== 'home';
  const [mostrarNotis, setMostrarNotis] = useState(false);

  return (
    <>
      <header
        id="app-navbar"
        className={`px-4 py-2.5 flex items-center justify-between z-30 transition-colors ${
          esSubpantalla
            ? 'sticky top-0 bg-[#090909]/90 backdrop-blur-md border-b border-[#1c1c1c]'
            : 'relative bg-transparent border-none'
        }`}
      >
        {esSubpantalla ? (
          <>
            <div className="flex items-center gap-2">
              <button
                id="btn-nav-back"
                type="button"
                onClick={() => onNavegar('home')}
                aria-label="Volver al inicio"
                className="w-10 h-10 rounded-xl bg-[#161616] hover:bg-[#202020] active:scale-95 text-[#F7B63F] flex items-center justify-center transition-all border border-[#2a2a2a] cursor-pointer"
              >
                <ArrowLeft size={20} />
              </button>

              <button
                id="btn-nav-brand"
                type="button"
                onClick={() => onNavegar('home')}
                className="flex items-center gap-2 text-left cursor-pointer group"
              >
                <Logo size="sm" className="group-hover:scale-105 transition-transform" />
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-[2px] text-[#F7B63F] block leading-none">
                    RESTAURANT
                  </span>
                  <h1 className="text-white text-sm font-black tracking-tight leading-tight m-0">
                    {APP_CONFIG.nombre}
                  </h1>
                </div>
              </button>
            </div>

            <button
              id="btn-nav-cart"
              type="button"
              onClick={() => onNavegar('cart')}
              aria-label="Ver carrito de compras"
              className="w-10 h-10 rounded-xl bg-[#181818] hover:bg-[#222222] active:scale-95 text-white flex items-center justify-center relative transition-all border border-[#2a2a2a] cursor-pointer"
            >
              <ShoppingBag size={19} className={cantidadTotal > 0 ? 'text-[#F7B63F]' : 'text-[#888]'} />
              {cantidadTotal > 0 && (
                <span
                  id="badge-navbar-count"
                  className="absolute -top-1.5 -right-1.5 bg-[#E53935] text-white font-black text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 border-2 border-[#090909] shadow-sm animate-pulse"
                >
                  {cantidadTotal}
                </span>
              )}
            </button>
          </>
        ) : (
          /* Home header: transparent, left hamburger menu, right notification bell */
          <>
            {/* Left: Hamburger menu icon */}
            <button
              id="btn-nav-menu"
              type="button"
              onClick={onAbrirMenu}
              aria-label="Abrir menú de opciones"
              className="w-10 h-10 flex items-center justify-center text-white hover:text-[#F7B63F] active:scale-90 transition-all cursor-pointer"
            >
              <Menu size={26} strokeWidth={2.4} />
            </button>

            {/* Right: Notification Bell icon */}
            <button
              id="btn-nav-notifications"
              type="button"
              onClick={() => setMostrarNotis(!mostrarNotis)}
              aria-label="Notificaciones"
              className="w-10 h-10 flex items-center justify-center text-white hover:text-[#F7B63F] active:scale-90 transition-all relative cursor-pointer"
            >
              <Bell size={24} strokeWidth={2.2} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E53935] ring-2 ring-[#090909] animate-ping" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E53935] ring-2 ring-[#090909]" />
            </button>
          </>
        )}
      </header>

      {/* Notifications Popover */}
      {mostrarNotis && (
        <div
          id="modal-notifications"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 animate-in fade-in duration-150"
          onClick={() => setMostrarNotis(false)}
        >
          <div
            className="w-full max-w-sm bg-[#141414] border border-[#2a2a2a] rounded-2xl p-4 shadow-2xl space-y-3"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#222]">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Bell size={16} className="text-[#F7B63F]" />
                <span>Notificaciones y Promociones</span>
              </div>
              <button
                type="button"
                onClick={() => setMostrarNotis(false)}
                className="w-7 h-7 rounded-lg bg-[#202020] text-[#999] hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            <div className="bg-[#1c1404] border border-[#F7B63F]/40 rounded-xl p-3 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F7B63F] text-black flex items-center justify-center shrink-0 mt-0.5">
                <Flame size={18} />
              </div>
              <div>
                <span className="bg-[#E53935] text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded">
                  SÚPER OFERTA ACTIVA
                </span>
                <h4 className="text-white font-bold text-xs mt-1 m-0">
                  Combo 2x20 con Pepsi Gratis
                </h4>
                <p className="text-[#bbb] text-[11px] mt-0.5 m-0 leading-snug">
                  2 Hamburguesas Clásicas al carbón + Pepsi de 355ml incluida por solo S/ 20.00.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMostrarNotis(false);
                    onNavegar('menu');
                  }}
                  className="mt-2 text-[10px] font-black text-[#F7B63F] uppercase tracking-wider flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <Sparkles size={12} />
                  <span>Ver en la carta →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
