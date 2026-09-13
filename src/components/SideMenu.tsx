import React from 'react';
import {
  X,
  Home,
  UtensilsCrossed,
  ShoppingBag,
  Clock,
  Navigation,
  User,
  ShieldCheck,
  PhoneCall,
  ChevronRight,
} from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { Logo } from './Logo';
import bgImage from '../assets/images/app_background.jpg';

interface SideMenuProps {
  abierto: boolean;
  onCerrar: () => void;
  onNavegar: (pantalla: string) => void;
  pantallaActual: string;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  abierto,
  onCerrar,
  onNavegar,
  pantallaActual,
}) => {
  const { cantidadTotal } = useCart();
  const { pedidoActivo } = useOrders();

  if (!abierto) return null;

  const navegarA = (pantalla: string) => {
    onNavegar(pantalla);
    onCerrar();
  };

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home, badge: null },
    { id: 'menu', label: 'Carta & Menú', icon: UtensilsCrossed, badge: 'Completo' },
    {
      id: 'cart',
      label: 'Carrito de Compras',
      icon: ShoppingBag,
      badge: cantidadTotal > 0 ? `${cantidadTotal} ítems` : null,
      badgeColor: 'bg-[#F7B63F] text-black font-black',
    },
    { id: 'orders', label: 'Mis Pedidos', icon: Clock, badge: null },
    {
      id: 'tracking',
      label: 'Seguimiento GPS en Vivo',
      icon: Navigation,
      badge: pedidoActivo && pedidoActivo.estado !== 'entregado' ? 'Activo 🏍️' : null,
      badgeColor: 'bg-[#22C55E] text-black font-bold animate-pulse',
    },
    { id: 'account', label: 'Mi Cuenta & Perfil', icon: User, badge: null },
    {
      id: 'courier',
      label: 'Modo Repartidor (PIN)',
      icon: ShieldCheck,
      badge: 'Motorizado',
      badgeColor: 'bg-[#333] text-[#F7B63F]',
    },
  ];

  return (
    <div
      id="side-menu-backdrop"
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-start animate-in fade-in duration-200"
      onClick={onCerrar}
    >
      <div
        id="side-menu-container"
        className="w-[85%] max-w-[320px] h-full bg-[#0d0d0d] border-r border-[#262626] flex flex-col p-5 shadow-2xl justify-between animate-in slide-in-from-left duration-200 relative overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Background texture layer */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-black/80 to-black/70" />

        {/* Drawer Header */}
        <div className="relative z-10">
          <div className="flex items-center justify-between pb-4 border-b border-[#222222]">
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <div>
                <h2 className="text-white text-lg font-black tracking-tight leading-tight m-0">
                  {APP_CONFIG.nombre}
                </h2>
                <p className="text-[11px] text-[#F7B63F] font-semibold m-0">
                  {APP_CONFIG.slogan}
                </p>
              </div>
            </div>

            <button
              id="btn-close-sidemenu"
              type="button"
              onClick={onCerrar}
              aria-label="Cerrar menú"
              className="w-9 h-9 rounded-xl bg-[#202020] hover:bg-[#2a2a2a] text-[#888] hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-[#2a2a2a]"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav List */}
          <nav className="mt-4 space-y-1.5" aria-label="Navegación principal">
            {navItems.map(item => {
              const activo = pantallaActual === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  id={`sidemenu-item-${item.id}`}
                  type="button"
                  onClick={() => navegarA(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer text-left ${
                    activo
                      ? 'bg-[#F7B63F] text-black font-black shadow-md shadow-[#F7B63F]/15'
                      : 'text-[#DDD] hover:bg-[#1c1c1c] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={activo ? 'text-black' : 'text-[#888]'} />
                    <span className="text-sm font-bold tracking-tight">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          item.badgeColor || (activo ? 'bg-black/15 text-black' : 'bg-[#222] text-[#888]')
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight size={14} className={activo ? 'text-black/70' : 'text-[#444]'} />
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Drawer Footer info */}
        <div className="pt-4 border-t border-[#222222] space-y-3 relative z-10">
          <a
            id="btn-sidemenu-whatsapp"
            href={`https://wa.me/${APP_CONFIG.telefonoWhatsapp.replace('+', '')}?text=Hola%20El%20Pana%20Burger,%20deseo%20hacer%20un%20pedido`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#181818] hover:bg-[#222] border border-[#2a2a2a] text-white py-2.5 px-3 rounded-xl flex items-center justify-between transition-all cursor-pointer text-xs"
          >
            <div className="flex items-center gap-2">
              <PhoneCall size={14} className="text-[#22c55e]" />
              <span className="font-bold">WhatsApp de Atención</span>
            </div>
            <span className="text-[#22c55e] font-extrabold text-[11px]">Chat directo</span>
          </a>

          <div className="text-[11px] text-[#666] flex justify-between items-center px-1">
            <span>{APP_CONFIG.horario}</span>
            <span className="font-mono text-[#F7B63F]">{APP_CONFIG.version}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
