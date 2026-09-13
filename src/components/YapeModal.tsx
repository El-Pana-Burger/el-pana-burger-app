import React, { useState } from 'react';
import { X, Copy, Check, QrCode, ShieldCheck, Sparkles } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

interface YapeModalProps {
  abierto: boolean;
  onCerrar: () => void;
  monto: number;
  onConfirmarPago: (codigoOp?: string) => void;
}

export const YapeModal: React.FC<YapeModalProps> = ({
  abierto,
  onCerrar,
  monto,
  onConfirmarPago,
}) => {
  const [copiado, setCopiado] = useState(false);
  const [codigoOp, setCodigoOp] = useState('');

  if (!abierto) return null;

  const copiarNumero = () => {
    navigator.clipboard.writeText(APP_CONFIG.telefonoYape.replace(/\s+/g, ''));
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div
      id="modal-yape-backdrop"
      className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onCerrar}
    >
      <div
        id="modal-yape-content"
        className="w-full max-w-sm bg-[#111111] border border-[#2a2a2a] rounded-3xl p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#222]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#742384] flex items-center justify-center text-white font-black text-xs shadow-md">
              Y
            </div>
            <div>
              <h3 className="text-white text-base font-black tracking-tight leading-tight m-0">
                Pagar con Yape o Plin
              </h3>
              <p className="text-[11px] text-[#aaa] m-0">Transferencia instantánea 0% comisión</p>
            </div>
          </div>

          <button
            id="btn-close-yape-modal"
            type="button"
            onClick={onCerrar}
            className="w-8 h-8 rounded-full bg-[#1c1c1c] text-[#888] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Monto a pagar */}
        <div className="bg-[#171717] rounded-2xl p-3.5 border border-[#262626] text-center">
          <span className="text-[11px] uppercase font-bold text-[#888] tracking-wider block">
            Monto a Transferir
          </span>
          <span className="text-2xl font-black text-[#F7B63F] mt-0.5 block">
            S/ {monto.toFixed(2)}
          </span>
        </div>

        {/* QR Code Container */}
        <div className="bg-gradient-to-b from-[#742384]/20 via-[#171717] to-[#00d1d2]/10 border border-[#333] rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Custom Stylized QR SVG representation of El Pana Burger */}
          <div className="bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center relative">
            <svg
              viewBox="0 0 100 100"
              className="w-40 h-40"
              fill="#111"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Corner 1 */}
              <rect x="5" y="5" width="28" height="28" rx="4" fill="#742384" />
              <rect x="11" y="11" width="16" height="16" rx="2" fill="white" />
              <rect x="15" y="15" width="8" height="8" rx="1" fill="#742384" />

              {/* Corner 2 */}
              <rect x="67" y="5" width="28" height="28" rx="4" fill="#742384" />
              <rect x="73" y="11" width="16" height="16" rx="2" fill="white" />
              <rect x="77" y="15" width="8" height="8" rx="1" fill="#742384" />

              {/* Corner 3 */}
              <rect x="5" y="67" width="28" height="28" rx="4" fill="#742384" />
              <rect x="11" y="73" width="16" height="16" rx="2" fill="white" />
              <rect x="15" y="77" width="8" height="8" rx="1" fill="#742384" />

              {/* Center Logo Box */}
              <circle cx="50" cy="50" r="14" fill="#F7B63F" />
              <text x="50" y="55" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#000">
                🍔
              </text>

              {/* Stylized QR Pixels */}
              <rect x="38" y="10" width="6" height="6" rx="1" />
              <rect x="50" y="8" width="6" height="6" rx="1" />
              <rect x="42" y="24" width="6" height="6" rx="1" />
              <rect x="54" y="20" width="6" height="6" rx="1" />

              <rect x="10" y="38" width="6" height="6" rx="1" />
              <rect x="22" y="44" width="6" height="6" rx="1" />
              <rect x="10" y="54" width="6" height="6" rx="1" />

              <rect x="70" y="38" width="6" height="6" rx="1" />
              <rect x="84" y="44" width="6" height="6" rx="1" />
              <rect x="76" y="54" width="6" height="6" rx="1" />

              <rect x="40" y="70" width="6" height="6" rx="1" />
              <rect x="52" y="76" width="6" height="6" rx="1" />
              <rect x="44" y="86" width="6" height="6" rx="1" />
              <rect x="70" y="72" width="6" height="6" rx="1" />
              <rect x="82" y="84" width="6" height="6" rx="1" />
            </svg>
          </div>

          <p className="text-[11px] text-[#ccc] font-medium mt-3 text-center">
            Escanea desde <strong className="text-[#c05ce0]">Yape</strong> o <strong className="text-[#00d1d2]">Plin</strong>
          </p>
        </div>

        {/* Datos de transferencia */}
        <div className="bg-[#171717] rounded-xl p-3 border border-[#262626] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#888]">Número de Yape / Plin:</span>
            <button
              id="btn-copiar-numero-yape"
              type="button"
              onClick={copiarNumero}
              className="flex items-center gap-1 text-xs font-black text-[#F7B63F] hover:text-[#e0a331] bg-[#222] hover:bg-[#282828] px-2 py-1 rounded-lg transition-all cursor-pointer"
            >
              {copiado ? (
                <>
                  <Check size={12} className="text-[#22c55e]" /> ¡Copiado!
                </>
              ) : (
                <>
                  <Copy size={12} /> {APP_CONFIG.telefonoYape}
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#888]">Titular de la cuenta:</span>
            <span className="text-white font-bold">{APP_CONFIG.titularYape}</span>
          </div>
        </div>

        {/* Input de número de operación (opcional) */}
        <div>
          <label htmlFor="input-codigo-operacion" className="block text-[11px] text-[#888] font-bold mb-1">
            Código de Operación o últimos dígitos (Opcional):
          </label>
          <input
            id="input-codigo-operacion"
            type="text"
            value={codigoOp}
            onChange={e => setCodigoOp(e.target.value)}
            placeholder="Ej: 948271"
            className="w-full bg-[#181818] border border-[#2e2e2e] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#F7B63F]"
          />
        </div>

        {/* Botón de confirmar */}
        <button
          id="btn-confirmar-ya-yapee"
          type="button"
          onClick={() => onConfirmarPago(codigoOp)}
          className="w-full bg-[#F7B63F] hover:bg-[#e0a331] active:scale-[0.99] text-black font-black py-3.5 px-4 rounded-xl transition-all cursor-pointer text-sm shadow-lg shadow-[#F7B63F]/20 flex items-center justify-center gap-2"
        >
          <ShieldCheck size={18} />
          YA REALICÉ EL YAPE →
        </button>
      </div>
    </div>
  );
};
