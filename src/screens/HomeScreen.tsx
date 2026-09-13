import React from 'react';
import { Bike, ArrowRight } from 'lucide-react';
import heroBurgerImg from '../assets/images/hero_burger.png';
import { Logo } from '../components/Logo';
import { PRODUCTOS } from '../data/products';
import { Producto, CategoriaTipo } from '../types';
import { useOrders } from '../context/OrdersContext';

interface HomeScreenProps {
  onNavegar: (pantalla: string) => void;
  onSeleccionarProducto?: (producto: Producto) => void;
  onFiltrarCategoria?: (categoria: CategoriaTipo) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavegar,
  onSeleccionarProducto,
}) => {
  const { pedidoActivo } = useOrders();

  const handleBurgerClick = () => {
    if (onSeleccionarProducto) {
      const burger = PRODUCTOS.find(p => p.id === 'hamburguesa-el-pana') || PRODUCTOS[0];
      onSeleccionarProducto(burger);
    } else {
      onNavegar('menu');
    }
  };

  return (
    <div id="screen-home" className="p-4 pb-28 space-y-6 flex-1 flex flex-col justify-center items-center min-h-[65vh]">
      {/* Banner de Pedido Activo en Vivo si hay pedido en curso */}
      {pedidoActivo && pedidoActivo.estado !== 'entregado' && (
        <div
          id="banner-pedido-activo"
          onClick={() => onNavegar('tracking')}
          className="w-full max-w-sm bg-gradient-to-r from-[#1c1404] via-[#2a1d08] to-[#1c1404] border-2 border-[#F7B63F] rounded-2xl p-3.5 shadow-xl shadow-[#F7B63F]/15 flex items-center justify-between cursor-pointer hover:scale-[1.01] transition-all group animate-in slide-in-from-top-3 mb-2"
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
      <div id="hero-brand-logo" className="flex flex-col items-center justify-center py-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-[#F7B63F]/30 via-[#E53935]/20 to-[#F7B63F]/30 rounded-full blur-3xl scale-125 pointer-events-none animate-pulse" />
          <Logo
            size="hero"
            className="relative hover:scale-105 transition-transform duration-300 drop-shadow-[0_16px_36px_rgba(0,0,0,0.95)]"
          />
        </div>
      </div>

      {/* Slogan Central: "Más que hamburguesas, SOMOS SABOR" con tipografía artística y hermosa */}
      <div id="hero-slogan" className="text-center py-2 select-none">
        <p className="font-['Yellowtail',cursive] text-2xl sm:text-3xl text-[#FFE699] tracking-wide leading-tight m-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] -rotate-1">
          Más que hamburguesas,
        </p>
        <div className="flex items-center justify-center gap-2.5 mt-1">
          <span className="h-[1.5px] w-6 sm:w-10 bg-gradient-to-r from-transparent via-[#F7B63F]/80 to-transparent" />
          <span className="text-[#F7B63F] text-[10px] select-none">✦</span>
          <h2 className="font-bebas text-3xl sm:text-4xl font-black uppercase tracking-[0.16em] bg-gradient-to-r from-[#FFF8D6] via-[#F7B63F] to-[#FF8A00] bg-clip-text text-transparent leading-none m-0 drop-shadow-[0_3px_16px_rgba(247,182,63,0.5)]">
            SOMOS SABOR
          </h2>
          <span className="text-[#F7B63F] text-[10px] select-none">✦</span>
          <span className="h-[1.5px] w-6 sm:w-10 bg-gradient-to-r from-transparent via-[#F7B63F]/80 to-transparent" />
        </div>
      </div>

      {/* Hamburguesa sin fondo colocada directamente debajo de la frase */}
      <div
        id="hero-burger-transparent"
        onClick={handleBurgerClick}
        className="relative flex flex-col items-center justify-center cursor-pointer group select-none -my-1"
      >
        {/* Resplandor cálido de brasas suave detrás de la hamburguesa */}
        <div className="absolute inset-0 max-w-[280px] mx-auto bg-gradient-to-t from-[#E53935]/35 via-[#F7B63F]/20 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />

        <img
          src={heroBurgerImg}
          alt="Hamburguesa El Pana"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const t = e.currentTarget;
            if (!t.src.includes('hero_burger.png')) t.src = '/hero_burger.png';
          }}
          className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_18px_rgba(247,182,63,0.35)] group-hover:scale-105 transition-transform duration-300"
        />

        <div className="mt-3 relative z-20 flex items-center justify-center">
          <span className="bg-gradient-to-r from-[#E53935] via-[#D32F2F] to-[#E53935] hover:brightness-110 active:scale-95 text-white text-xs font-black uppercase tracking-wider px-5 py-2 rounded-full shadow-lg shadow-[#E53935]/40 border border-[#ff6666]/40 transition-all flex items-center gap-1.5 cursor-pointer">
            <span>Pedir Ahora</span>
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </div>
  );
};

