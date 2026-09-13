import React, { useState } from 'react';
import {
  User,
  Phone,
  MapPin,
  Clock,
  Save,
  Check,
  PhoneCall,
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { APP_CONFIG } from '../config/appConfig';
import { Logo } from '../components/Logo';

export const AccountScreen: React.FC = () => {
  const { usuario, actualizarPerfil } = useUser();
  const [nombre, setNombre] = useState(usuario.nombre);
  const [telefono, setTelefono] = useState(usuario.telefono);
  const [direccion, setDireccion] = useState(usuario.direccion);
  const [referencia, setReferencia] = useState(usuario.referencia);
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);

  const handleGuardar = (e: React.FormEvent) => {
    e.preventDefault();
    actualizarPerfil({
      nombre,
      telefono,
      direccion,
      referencia,
    });
    setGuardadoExitoso(true);
    setTimeout(() => setGuardadoExitoso(false), 2500);
  };

  return (
    <div id="screen-account" className="p-4 pb-28 space-y-4 flex-1">
      {/* Header */}
      <div>
        <h2 className="text-white text-xl font-black tracking-tight m-0">
          Mi Perfil & Datos
        </h2>
        <p className="text-[#888] text-xs m-0">
          Guarda tus datos de entrega para agilizar tus futuros pedidos
        </p>
      </div>

      {/* Formulario de Perfil */}
      <form onSubmit={handleGuardar} className="bg-[#141414] border border-[#242424] rounded-2xl p-4 space-y-3.5 shadow-md">
        <div>
          <label htmlFor="perfil-nombre" className="block text-[11px] font-bold text-[#888] mb-1">
            Tu Nombre Completo:
          </label>
          <input
            id="perfil-nombre"
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            className="w-full bg-[#1b1b1b] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F7B63F]"
          />
        </div>

        <div>
          <label htmlFor="perfil-telefono" className="block text-[11px] font-bold text-[#888] mb-1">
            Número de Teléfono / WhatsApp:
          </label>
          <input
            id="perfil-telefono"
            type="tel"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
            className="w-full bg-[#1b1b1b] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F7B63F]"
          />
        </div>

        <div>
          <label htmlFor="perfil-direccion" className="block text-[11px] font-bold text-[#888] mb-1">
            Dirección de Entrega Predeterminada:
          </label>
          <input
            id="perfil-direccion"
            type="text"
            value={direccion}
            onChange={e => setDireccion(e.target.value)}
            className="w-full bg-[#1b1b1b] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F7B63F]"
          />
        </div>

        <div>
          <label htmlFor="perfil-referencia" className="block text-[11px] font-bold text-[#888] mb-1">
            Referencia de tu Domicilio:
          </label>
          <input
            id="perfil-referencia"
            type="text"
            value={referencia}
            onChange={e => setReferencia(e.target.value)}
            className="w-full bg-[#1b1b1b] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F7B63F]"
          />
        </div>

        {guardadoExitoso && (
          <div className="bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] p-2.5 rounded-xl text-xs flex items-center gap-2 font-bold animate-in fade-in">
            <Check size={16} /> ¡Tus datos se guardaron correctamente!
          </div>
        )}

        <button
          id="btn-guardar-perfil"
          type="submit"
          className="w-full bg-[#F7B63F] hover:bg-[#e0a331] text-black font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
        >
          <Save size={15} />
          GUARDAR CAMBIOS
        </button>
      </form>

      {/* Información de El Pana Burger */}
      <div className="bg-[#141414] border border-[#242424] rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-3 pb-2.5 border-b border-[#222]">
          <Logo size="sm" />
          <div>
            <h3 className="text-white text-xs font-black uppercase tracking-wider m-0">
              {APP_CONFIG.nombre}
            </h3>
            <p className="text-[11px] text-[#F7B63F] m-0">{APP_CONFIG.slogan}</p>
          </div>
        </div>

        <div className="space-y-2 text-xs text-[#aaa]">
          <div className="flex justify-between items-center">
            <span>Versión de la App:</span>
            <span className="text-white font-mono font-bold bg-[#222] px-2 py-0.5 rounded">
              {APP_CONFIG.version}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span>Horario de Atención:</span>
            <span className="text-white font-medium">{APP_CONFIG.horario}</span>
          </div>

          <div className="flex justify-between items-center">
            <span>Local Principal:</span>
            <span className="text-white font-medium text-right max-w-[190px]">
              {APP_CONFIG.direccionLocal}
            </span>
          </div>
        </div>

        <div className="pt-2">
          <a
            id="btn-account-whatsapp-link"
            href={`https://wa.me/${APP_CONFIG.telefonoWhatsapp.replace('+', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#1b1b1b] hover:bg-[#242424] text-[#22c55e] border border-[#2a2a2a] py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-colors cursor-pointer"
          >
            <PhoneCall size={14} />
            <span>Contactar por WhatsApp Oficial</span>
          </a>
        </div>
      </div>
    </div>
  );
};
