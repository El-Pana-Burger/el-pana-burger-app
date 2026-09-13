import React, { useState } from 'react';
import {
  ShieldCheck,
  Bike,
  CheckCircle2,
  MapPin,
  Phone,
  Clock,
  AlertCircle,
  Check,
} from 'lucide-react';
import { useOrders } from '../context/OrdersContext';

interface CourierVerifyScreenProps {
  onNavegar: (pantalla: string) => void;
}

export const CourierVerifyScreen: React.FC<CourierVerifyScreenProps> = ({ onNavegar }) => {
  const { pedidos, verificarCodigoEntrega, seleccionarPedidoActivo } = useOrders();
  const [codigoPin, setCodigoPin] = useState('');
  const [pedidoSeleccionadoId, setPedidoSeleccionadoId] = useState<string>(
    pedidos.find(p => p.estado !== 'entregado')?.id || (pedidos[0]?.id || '')
  );
  const [mensajeResultado, setMensajeResultado] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  const pedidosPendientes = pedidos.filter(p => p.estado !== 'entregado');
  const pedidoSeleccionado = pedidos.find(p => p.id === pedidoSeleccionadoId);

  const handleVerificar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pedidoSeleccionadoId) {
      setMensajeResultado({ tipo: 'error', texto: 'Selecciona un pedido para verificar.' });
      return;
    }
    if (!codigoPin.trim()) {
      setMensajeResultado({ tipo: 'error', texto: 'Ingresa el código PIN de 4 dígitos proporcionado por el cliente.' });
      return;
    }

    const exito = verificarCodigoEntrega(pedidoSeleccionadoId, codigoPin.trim());
    if (exito) {
      setMensajeResultado({
        tipo: 'exito',
        texto: `¡Excelente! Pedido ${pedidoSeleccionadoId} verificado y marcado como ENTREGADO con éxito.`,
      });
      setCodigoPin('');
    } else {
      setMensajeResultado({
        tipo: 'error',
        texto: 'PIN incorrecto. Pídele al cliente que revise el código en su pantalla de seguimiento.',
      });
    }
  };

  return (
    <div id="screen-courier-verify" className="p-4 pb-28 space-y-4 flex-1">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F7B63F] text-black flex items-center justify-center font-black">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h2 className="text-white text-lg font-black tracking-tight m-0">
              Modo Repartidor & Verificación
            </h2>
            <p className="text-[#888] text-xs m-0">
              Entrega segura mediante validación de PIN
            </p>
          </div>
        </div>
      </div>

      {/* Verification Card */}
      <div className="bg-[#141414] border border-[#262626] rounded-2xl p-4 space-y-3.5 shadow-md">
        <h3 className="text-white text-xs font-black uppercase tracking-wider m-0">
          Confirmar Entrega de Pedido
        </h3>

        <form onSubmit={handleVerificar} className="space-y-3">
          {/* Selector de Pedido */}
          <div>
            <label htmlFor="select-pedido-courier" className="block text-[11px] font-bold text-[#888] mb-1">
              Seleccionar Pedido Activo:
            </label>
            {pedidos.length === 0 ? (
              <p className="text-xs text-[#777] italic">No hay pedidos registrados en el sistema.</p>
            ) : (
              <select
                id="select-pedido-courier"
                value={pedidoSeleccionadoId}
                onChange={e => {
                  setPedidoSeleccionadoId(e.target.value);
                  setMensajeResultado(null);
                }}
                className="w-full bg-[#1b1b1b] border border-[#2c2c2c] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#F7B63F] cursor-pointer"
              >
                {pedidos.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.id} - {p.cliente.nombre} ({p.estado.toUpperCase()}) - S/ {p.total.toFixed(2)}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Información rápida del pedido seleccionado */}
          {pedidoSeleccionado && (
            <div className="bg-[#191919] rounded-xl p-3 border border-[#262626] space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#888]">Cliente:</span>
                <span className="font-bold text-white">{pedidoSeleccionado.cliente.nombre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">Dirección:</span>
                <span className="text-white text-right truncate max-w-[200px]">
                  {pedidoSeleccionado.cliente.direccion}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">Estado Actual:</span>
                <span
                  className={`font-black uppercase text-[10px] px-2 py-0.5 rounded ${
                    pedidoSeleccionado.estado === 'entregado'
                      ? 'bg-[#22C55E]/20 text-[#22C55E]'
                      : 'bg-[#F7B63F]/20 text-[#F7B63F]'
                  }`}
                >
                  {pedidoSeleccionado.estado}
                </span>
              </div>
            </div>
          )}

          {/* Input del PIN */}
          <div>
            <label htmlFor="input-courier-pin" className="block text-[11px] font-bold text-[#888] mb-1">
              Ingresar PIN de 4 dígitos del Cliente:
            </label>
            <input
              id="input-courier-pin"
              type="text"
              maxLength={6}
              value={codigoPin}
              onChange={e => setCodigoPin(e.target.value)}
              placeholder="Ej: 8492"
              className="w-full bg-[#1e1e1e] border-2 border-[#333] focus:border-[#F7B63F] rounded-xl py-3 px-4 text-center font-mono text-xl font-black text-[#F7B63F] tracking-widest focus:outline-none"
            />
          </div>

          {/* Mensajes de Resultado */}
          {mensajeResultado && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                mensajeResultado.tipo === 'exito'
                  ? 'bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#4ade80]'
                  : 'bg-[#E53935]/15 border border-[#E53935]/40 text-[#f87171]'
              }`}
            >
              {mensajeResultado.tipo === 'exito' ? (
                <CheckCircle2 size={16} className="flex-shrink-0" />
              ) : (
                <AlertCircle size={16} className="flex-shrink-0" />
              )}
              <span>{mensajeResultado.texto}</span>
            </div>
          )}

          <button
            id="btn-verificar-pin-submit"
            type="submit"
            className="w-full bg-[#F7B63F] hover:bg-[#e0a331] active:scale-[0.99] text-black font-black py-3.5 px-4 rounded-xl transition-all cursor-pointer text-xs uppercase tracking-wider shadow-md"
          >
            VALIDAR PIN Y COMPLETAR ENTREGA
          </button>
        </form>
      </div>

      {/* Lista de Entregas Activas para el motorizado */}
      <div className="bg-[#141414] border border-[#262626] rounded-2xl p-4 space-y-3">
        <h3 className="text-white text-xs font-black uppercase tracking-wider m-0">
          Entregas Pendientes ({pedidosPendientes.length})
        </h3>

        {pedidosPendientes.length === 0 ? (
          <p className="text-xs text-[#777] italic m-0">No hay entregas pendientes en cola.</p>
        ) : (
          <div className="space-y-2.5">
            {pedidosPendientes.map(p => (
              <div
                key={p.id}
                onClick={() => {
                  setPedidoSeleccionadoId(p.id);
                  seleccionarPedidoActivo(p.id);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  p.id === pedidoSeleccionadoId
                    ? 'bg-[#201d12] border-[#F7B63F]'
                    : 'bg-[#181818] border-[#262626] hover:border-[#383838]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white">{p.id}</span>
                    <span className="text-[10px] bg-[#222] text-[#888] px-1.5 py-0.5 rounded font-mono">
                      PIN: {p.codigoVerificacion}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#aaa] mt-0.5 m-0 truncate max-w-[200px]">
                    {p.cliente.direccion}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-[#F7B63F]">S/ {p.total.toFixed(2)}</span>
                  <span className="text-[9px] text-[#888] block capitalize">{p.metodoPago}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
