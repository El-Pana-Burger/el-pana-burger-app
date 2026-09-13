import React, { useState } from 'react';
import {
  Navigation,
  Bike,
  Clock,
  CheckCircle2,
  Phone,
  MessageSquare,
  Share2,
  Copy,
  Check,
  ShieldCheck,
  MapPin,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { useOrders } from '../context/OrdersContext';
import { APP_CONFIG } from '../config/appConfig';

interface OrderTrackingScreenProps {
  onNavegar: (pantalla: string) => void;
}

export const OrderTrackingScreen: React.FC<OrderTrackingScreenProps> = ({ onNavegar }) => {
  const { pedidoActivo } = useOrders();
  const [enlaceCopiado, setEnlaceCopiado] = useState(false);

  if (!pedidoActivo) {
    return (
      <div className="p-5 flex-1 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#181818] flex items-center justify-center text-3xl">
          📦
        </div>
        <p className="text-white font-bold text-sm">No tienes ningún pedido activo en este momento.</p>
        <button
          type="button"
          onClick={() => onNavegar('menu')}
          className="bg-[#F7B63F] text-black font-black text-xs py-3 px-5 rounded-xl cursor-pointer"
        >
          Hacer un Pedido
        </button>
      </div>
    );
  }

  const progreso = pedidoActivo.coordenadasProgreso; // 0 to 100
  const estado = pedidoActivo.estado;

  const pasos = [
    { id: 'recibido', label: 'Confirmado', desc: 'Recibido en sistema' },
    { id: 'en_preparacion', label: 'En la Cocina', desc: 'Carne a la parrilla' },
    { id: 'en_camino', label: 'En Camino', desc: 'Motorizado en ruta' },
    { id: 'entregado', label: 'Entregado', desc: '¡Buen provecho!' },
  ];

  const indiceEstado = pasos.findIndex(p => p.id === estado);

  const copiarEnlaceSeguimiento = () => {
    navigator.clipboard.writeText(
      `https://elpana.pe/tracking/${pedidoActivo.id} - PIN: ${pedidoActivo.codigoVerificacion}`
    );
    setEnlaceCopiado(true);
    setTimeout(() => setEnlaceCopiado(false), 2000);
  };

  // Motorbike position along SVG bezier path:
  // Starts at restaurant (x: 40, y: 150), ends at customer (x: 320, y: 40)
  const bikeX = 40 + (progreso / 100) * 280;
  // Subtle curve
  const bikeY = 150 - Math.sin((progreso / 100) * Math.PI) * 50 - (progreso / 100) * 110;

  return (
    <div id="screen-order-tracking" className="p-4 pb-28 space-y-4 flex-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
            <span className="text-[10px] uppercase font-extrabold text-[#F7B63F] tracking-wider">
              SEGUIMIENTO GPS EN VIVO
            </span>
          </div>
          <h2 className="text-white text-xl font-black tracking-tight m-0 mt-0.5">
            Pedido {pedidoActivo.id}
          </h2>
        </div>

        <button
          id="btn-compartir-tracking"
          type="button"
          onClick={copiarEnlaceSeguimiento}
          className="flex items-center gap-1 text-xs bg-[#1a1a1a] hover:bg-[#252525] border border-[#2e2e2e] text-[#ccc] hover:text-white px-3 py-1.5 rounded-xl transition-all cursor-pointer font-bold"
        >
          {enlaceCopiado ? (
            <>
              <Check size={13} className="text-[#22c55e]" /> ¡Copiado!
            </>
          ) : (
            <>
              <Share2 size={13} /> Compartir
            </>
          )}
        </button>
      </div>

      {/* Simulated Live GPS Map Canvas */}
      <div className="relative w-full h-52 bg-[#121212] border border-[#262626] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-3">
        {/* Map Grid and streets background graphic */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#F7B63F_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Top bar on map */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="bg-[#090909]/90 backdrop-blur-md border border-[#2a2a2a] px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[11px] font-bold text-white shadow-md">
            <Clock size={12} className="text-[#F7B63F]" />
            <span>
              {estado === 'entregado'
                ? '¡Entregado!'
                : `Llegada estimada: ${pedidoActivo.tiempoEstimadoMinutos} min`}
            </span>
          </div>

          <div className="bg-[#090909]/90 backdrop-blur-md border border-[#2a2a2a] px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[11px] font-black text-[#22c55e]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            <span>GPS ACTIVO</span>
          </div>
        </div>

        {/* SVG Route and Animated Moving Bike */}
        <div className="relative w-full h-28 my-auto">
          <svg className="w-full h-full" viewBox="0 0 360 160" fill="none">
            {/* Delivery route line */}
            <path
              d="M 40 140 Q 180 30 320 40"
              stroke="#262626"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 40 140 Q 180 30 320 40"
              stroke="#F7B63F"
              strokeWidth="4"
              strokeDasharray="6 6"
              strokeLinecap="round"
              className="animate-pulse"
            />

            {/* Restaurant Pin */}
            <g transform="translate(40, 140)">
              <circle r="12" fill="#E53935" opacity="0.3" className="animate-ping" />
              <circle r="10" fill="#E53935" />
              <text x="0" y="4" fontSize="10" textAnchor="middle" fill="#fff">
                🔥
              </text>
            </g>

            {/* Destination Pin */}
            <g transform="translate(320, 40)">
              <circle r="12" fill="#22C55E" opacity="0.3" className="animate-ping" />
              <circle r="10" fill="#22C55E" />
              <text x="0" y="4" fontSize="10" textAnchor="middle" fill="#000" fontWeight="bold">
                🏠
              </text>
            </g>

            {/* Motorizado Motorbike Position */}
            <g transform={`translate(${bikeX}, ${bikeY})`}>
              <circle r="14" fill="#F7B63F" opacity="0.3" className="animate-ping" />
              <circle r="12" fill="#F7B63F" stroke="#111" strokeWidth="2" />
              <text x="0" y="4" fontSize="11" textAnchor="middle">
                🏍️
              </text>
            </g>
          </svg>
        </div>

        {/* Map Bottom Legend */}
        <div className="relative z-10 flex items-center justify-between text-[10px] text-[#888] font-bold px-1">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#E53935]" /> El Pana Local
          </span>
          <span className="flex items-center gap-1 text-[#F7B63F]">
            🏍️ En ruta
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" /> Tu Domicilio
          </span>
        </div>
      </div>

      {/* PIN de Entrega (Seguridad del cliente y repartidor) */}
      <div className="bg-[#171717] border border-[#2e2e2e] rounded-2xl p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#222] border border-[#333] flex items-center justify-center text-[#F7B63F]">
            <ShieldCheck size={22} />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#888] block">
              PIN de Entrega Seguro
            </span>
            <p className="text-white text-xs font-medium m-0">
              Díctaselo a tu motorizado al recibir tu pedido:
            </p>
          </div>
        </div>

        <div className="bg-[#222] border border-[#F7B63F]/40 px-3 py-1.5 rounded-xl text-center">
          <span className="font-mono text-lg font-black text-[#F7B63F] tracking-widest">
            {pedidoActivo.codigoVerificacion}
          </span>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="bg-[#141414] border border-[#242424] rounded-2xl p-4 space-y-3">
        <h3 className="text-white text-xs font-black uppercase tracking-wider m-0">
          Estado del Pedido
        </h3>

        <div className="space-y-3 pt-1">
          {pasos.map((paso, index) => {
            const completado = index <= indiceEstado;
            const esActual = index === indiceEstado;
            return (
              <div key={paso.id} className="flex items-center gap-3 relative">
                {/* Check / Circle */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    completado
                      ? 'bg-[#22C55E] text-black font-black'
                      : 'bg-[#222] text-[#555] border border-[#333]'
                  } ${esActual ? 'ring-4 ring-[#22C55E]/20 scale-105' : ''}`}
                >
                  {completado ? <Check size={14} className="stroke-[3]" /> : index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <h4
                    className={`text-xs font-black m-0 leading-tight ${
                      completado ? 'text-white' : 'text-[#666]'
                    }`}
                  >
                    {paso.label}
                  </h4>
                  <p className="text-[11px] text-[#888] m-0 leading-tight">
                    {paso.desc}
                  </p>
                </div>

                {esActual && estado !== 'entregado' && (
                  <span className="text-[10px] bg-[#F7B63F]/20 text-[#F7B63F] font-extrabold px-2 py-0.5 rounded-md animate-pulse">
                    En progreso
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Motorizado Details Card */}
      <div className="bg-[#141414] border border-[#242424] rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#333] to-[#222] border border-[#383838] flex items-center justify-center text-xl shadow-inner">
              🛵
            </div>
            <div>
              <span className="text-[10px] text-[#888] uppercase font-bold tracking-wider">
                Motorizado asignado
              </span>
              <h4 className="text-white text-sm font-black m-0 leading-tight">
                {pedidoActivo.motorizado.nombre}
              </h4>
              <p className="text-[#888] text-[11px] m-0">
                {pedidoActivo.motorizado.vehiculo} • Placa:{' '}
                <strong className="text-white">{pedidoActivo.motorizado.placa}</strong>
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-[#F7B63F] font-black">
              ⭐ {pedidoActivo.motorizado.calificacion}
            </span>
          </div>
        </div>

        {/* Communication Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            id="btn-llamar-motorizado"
            href={`tel:${pedidoActivo.motorizado.telefono}`}
            className="bg-[#202020] hover:bg-[#282828] text-white border border-[#333] py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-colors cursor-pointer"
          >
            <Phone size={14} className="text-[#22c55e]" />
            <span>Llamar</span>
          </a>

          <a
            id="btn-whatsapp-motorizado"
            href={`https://wa.me/${pedidoActivo.motorizado.telefono.replace(/\s+/g, '').replace('+', '')}?text=Hola%20${pedidoActivo.motorizado.nombre},%20sobre%20mi%20pedido%20El%20Pana%20Burger%20${pedidoActivo.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#202020] hover:bg-[#282828] text-white border border-[#333] py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-colors cursor-pointer"
          >
            <MessageSquare size={14} className="text-[#22c55e]" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Resumen de Dirección */}
      <div className="bg-[#141414] border border-[#242424] rounded-2xl p-3.5 flex items-start gap-2.5 text-xs">
        <MapPin size={16} className="text-[#F7B63F] flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <span className="text-white font-bold block">{pedidoActivo.cliente.direccion}</span>
          {pedidoActivo.cliente.referencia && (
            <span className="text-[#888] text-[11px] block mt-0.5">
              Ref: {pedidoActivo.cliente.referencia}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
