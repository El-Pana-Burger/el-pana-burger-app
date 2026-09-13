import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  User,
  CreditCard,
  QrCode,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { useUser } from '../context/UserContext';
import { MetodoPago } from '../types';
import { APP_CONFIG } from '../config/appConfig';
import { YapeModal } from '../components/YapeModal';

interface CheckoutScreenProps {
  onNavegar: (pantalla: string) => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ onNavegar }) => {
  const { items, subtotal, costoEnvio, total, vaciarCarrito, notaGeneral } = useCart();
  const { crearPedido } = useOrders();
  const { usuario, actualizarPerfil } = useUser();

  const [nombre, setNombre] = useState(usuario.nombre);
  const [telefono, setTelefono] = useState(usuario.telefono);
  const [direccion, setDireccion] = useState(usuario.direccion);
  const [referencia, setReferencia] = useState(usuario.referencia);
  const [metodoPago, setMetodoPago] = useState<MetodoPago>('yape');
  const [montoEfectivo, setMontoEfectivo] = useState<string>('');
  const [modalYapeAbierto, setModalYapeAbierto] = useState<boolean>(false);
  const [codigoOperacionYape, setCodigoOperacionYape] = useState<string>('');
  const [errorValidacion, setErrorValidacion] = useState<string>('');

  if (items.length === 0) {
    return (
      <div className="p-5 flex-1 flex flex-col items-center justify-center text-center space-y-4">
        <p className="text-white font-bold">No hay ítems en tu carrito para procesar el pago.</p>
        <button
          type="button"
          onClick={() => onNavegar('menu')}
          className="bg-[#F7B63F] text-black font-black text-xs py-3 px-5 rounded-xl cursor-pointer"
        >
          Ir a la Carta
        </button>
      </div>
    );
  }

  const vueltoCalculado =
    metodoPago === 'efectivo' && montoEfectivo && Number(montoEfectivo) > total
      ? Number(montoEfectivo) - total
      : 0;

  const handleConfirmarPedido = () => {
    if (!nombre.trim()) {
      setErrorValidacion('Por favor ingresa tu nombre.');
      return;
    }
    if (!telefono.trim() || telefono.length < 8) {
      setErrorValidacion('Por favor ingresa un número de teléfono válido para coordinar la entrega.');
      return;
    }
    if (!direccion.trim()) {
      setErrorValidacion('Por favor ingresa tu dirección de entrega.');
      return;
    }

    if (metodoPago === 'efectivo' && montoEfectivo && Number(montoEfectivo) < total) {
      setErrorValidacion(`El monto con el que pagas debe ser igual o mayor al total (S/ ${total.toFixed(2)}).`);
      return;
    }

    setErrorValidacion('');

    // Actualizar perfil de usuario para futuros pedidos
    actualizarPerfil({
      nombre,
      telefono,
      direccion,
      referencia,
    });

    // Crear el pedido en el contexto
    const nuevoPedido = crearPedido({
      items: [...items],
      subtotal,
      costoEnvio,
      total,
      metodoPago,
      montoEfectivo: metodoPago === 'efectivo' && montoEfectivo ? Number(montoEfectivo) : undefined,
      vueltoRequerido: vueltoCalculado > 0 ? vueltoCalculado : undefined,
      cliente: {
        nombre,
        telefono,
        direccion,
        referencia,
      },
    });

    // Vaciar carrito
    vaciarCarrito();

    // Redirigir a pantalla de seguimiento en vivo con GPS
    onNavegar('tracking');
  };

  return (
    <div id="screen-checkout" className="p-4 pb-32 space-y-5 flex-1">
      {/* Header */}
      <div>
        <h2 className="text-white text-xl font-black tracking-tight m-0">
          Finalizar Pedido
        </h2>
        <p className="text-[#888] text-xs m-0 mt-0.5">
          Ingresa los datos para que tu motorizado llegue sin demoras
        </p>
      </div>

      {errorValidacion && (
        <div className="bg-[#E53935]/15 border border-[#E53935]/40 rounded-xl p-3 text-xs text-[#ff6b6b] font-bold">
          ⚠️ {errorValidacion}
        </div>
      )}

      {/* Datos de Entrega */}
      <section className="bg-[#141414] border border-[#242424] rounded-2xl p-4 space-y-3.5">
        <div className="flex items-center gap-2 pb-2 border-b border-[#222]">
          <MapPin size={16} className="text-[#F7B63F]" />
          <h3 className="text-white text-sm font-black m-0">
            Dirección de Entrega
          </h3>
        </div>

        <div className="space-y-3">
          <div>
            <label htmlFor="input-nombre" className="block text-[11px] font-bold text-[#888] mb-1">
              Nombre de quien recibe:
            </label>
            <input
              id="input-nombre"
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Ej: Carlos Silva"
              className="w-full bg-[#1b1b1b] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F7B63F]"
            />
          </div>

          <div>
            <label htmlFor="input-telefono" className="block text-[11px] font-bold text-[#888] mb-1">
              Teléfono / WhatsApp de contacto:
            </label>
            <input
              id="input-telefono"
              type="tel"
              value={telefono}
              onChange={e => setTelefono(e.target.value)}
              placeholder="Ej: 987 654 321"
              className="w-full bg-[#1b1b1b] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F7B63F]"
            />
          </div>

          <div>
            <label htmlFor="input-direccion" className="block text-[11px] font-bold text-[#888] mb-1">
              Dirección exacta:
            </label>
            <input
              id="input-direccion"
              type="text"
              value={direccion}
              onChange={e => setDireccion(e.target.value)}
              placeholder="Ej: Av. Benavides 1530, Dpto 402"
              className="w-full bg-[#1b1b1b] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F7B63F]"
            />
          </div>

          <div>
            <label htmlFor="input-referencia" className="block text-[11px] font-bold text-[#888] mb-1">
              Referencia para el motorizado (Opcional):
            </label>
            <input
              id="input-referencia"
              type="text"
              value={referencia}
              onChange={e => setReferencia(e.target.value)}
              placeholder="Ej: Frente al parque, casa con rejas negras"
              className="w-full bg-[#1b1b1b] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F7B63F]"
            />
          </div>
        </div>
      </section>

      {/* Método de Pago */}
      <section className="bg-[#141414] border border-[#242424] rounded-2xl p-4 space-y-3.5">
        <div className="flex items-center gap-2 pb-2 border-b border-[#222]">
          <CreditCard size={16} className="text-[#F7B63F]" />
          <h3 className="text-white text-sm font-black m-0">
            Método de Pago
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Yape / Plin */}
          <button
            type="button"
            onClick={() => setMetodoPago('yape')}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              metodoPago === 'yape'
                ? 'bg-[#742384]/20 border-[#9c27b0] text-white shadow-md'
                : 'bg-[#181818] border-[#262626] text-[#888] hover:border-[#383838]'
            }`}
          >
            <QrCode size={20} className={metodoPago === 'yape' ? 'text-[#c05ce0]' : 'text-[#888]'} />
            <span className="text-xs font-black">Yape / Plin</span>
            <span className="text-[9px] text-[#22c55e] font-bold">Sin comisiones</span>
          </button>

          {/* Efectivo */}
          <button
            type="button"
            onClick={() => setMetodoPago('efectivo')}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              metodoPago === 'efectivo'
                ? 'bg-[#F7B63F]/15 border-[#F7B63F] text-white shadow-md'
                : 'bg-[#181818] border-[#262626] text-[#888] hover:border-[#383838]'
            }`}
          >
            <Banknote size={20} className={metodoPago === 'efectivo' ? 'text-[#F7B63F]' : 'text-[#888]'} />
            <span className="text-xs font-black">Efectivo</span>
            <span className="text-[9px] text-[#aaa]">Contraentrega</span>
          </button>

          {/* Tarjeta */}
          <button
            type="button"
            onClick={() => setMetodoPago('tarjeta')}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              metodoPago === 'tarjeta'
                ? 'bg-[#3b82f6]/20 border-[#3b82f6] text-white shadow-md'
                : 'bg-[#181818] border-[#262626] text-[#888] hover:border-[#383838]'
            }`}
          >
            <CreditCard size={20} className={metodoPago === 'tarjeta' ? 'text-[#60a5fa]' : 'text-[#888]'} />
            <span className="text-xs font-black">Tarjeta POS</span>
            <span className="text-[9px] text-[#aaa]">Contraentrega</span>
          </button>
        </div>

        {/* Detalles específicos según método de pago */}
        {metodoPago === 'yape' && (
          <div className="bg-[#1a1320] border border-[#742384]/40 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#ddd] font-bold">
                Pagar S/ {total.toFixed(2)} por Yape o Plin:
              </span>
              <button
                type="button"
                onClick={() => setModalYapeAbierto(true)}
                className="bg-[#742384] hover:bg-[#8e2ba2] text-white text-[11px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <QrCode size={12} /> Ver Código QR
              </button>
            </div>
            <p className="text-[11px] text-[#aaa] m-0">
              Número: <strong className="text-white font-mono">{APP_CONFIG.telefonoYape}</strong> ({APP_CONFIG.titularYape})
            </p>
            {codigoOperacionYape && (
              <p className="text-[11px] text-[#22c55e] font-bold m-0">
                ✓ Código de operación registrado: {codigoOperacionYape}
              </p>
            )}
          </div>
        )}

        {metodoPago === 'efectivo' && (
          <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl p-3 space-y-2">
            <label htmlFor="input-monto-efectivo" className="block text-xs text-[#ddd] font-bold">
              ¿Con cuánto billete pagarás? (Para llevarte el vuelto exacto):
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#888] font-bold">S/</span>
              <input
                id="input-monto-efectivo"
                type="number"
                min={total}
                value={montoEfectivo}
                onChange={e => setMontoEfectivo(e.target.value)}
                placeholder={`Ej: ${Math.ceil(total / 10) * 10 || 50}`}
                className="flex-1 bg-[#222] border border-[#333] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#F7B63F]"
              />
            </div>
            {vueltoCalculado > 0 && (
              <p className="text-[11px] text-[#22C55E] font-bold m-0">
                Tu vuelto será de: S/ {vueltoCalculado.toFixed(2)}
              </p>
            )}
          </div>
        )}

        {metodoPago === 'tarjeta' && (
          <div className="bg-[#151c26] border border-[#1e3a5f] rounded-xl p-3 text-xs text-[#93c5fd]">
            El motorizado llevará un POS inalámbrico para que pagues con cualquier tarjeta de débito o crédito Visa, Mastercard o Diners.
          </div>
        )}
      </section>

      {/* Resumen del Pedido */}
      <section className="bg-[#141414] border border-[#242424] rounded-2xl p-4 space-y-2.5">
        <h3 className="text-white text-xs font-black uppercase tracking-wider mb-2">
          Resumen de tu compra
        </h3>

        <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
          {items.map(it => (
            <div key={it.idItem} className="flex justify-between text-xs text-[#bbb]">
              <span>
                {it.cantidad}x {it.producto.nombre}
              </span>
              <span className="font-bold">S/ {it.precioTotalItem.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-[#222] flex justify-between text-xs text-[#aaa]">
          <span>Costo de Delivery</span>
          <span className="font-bold text-white">
            {costoEnvio === 0 ? 'GRATIS' : `S/ ${costoEnvio.toFixed(2)}`}
          </span>
        </div>

        <div className="pt-2 border-t border-[#222] flex justify-between items-center">
          <span className="text-white font-black text-sm">TOTAL A PAGAR</span>
          <span className="text-[#F7B63F] font-black text-xl">
            S/ {total.toFixed(2)}
          </span>
        </div>
      </section>

      {/* Botón Final Confirmar */}
      <div className="pt-2">
        <button
          id="btn-confirmar-pedido-final"
          type="button"
          onClick={handleConfirmarPedido}
          className="w-full bg-[#F7B63F] hover:bg-[#e0a331] active:scale-[0.99] text-black font-black py-4 px-5 rounded-2xl transition-all cursor-pointer text-xs uppercase tracking-wider shadow-xl shadow-[#F7B63F]/20 flex items-center justify-between"
        >
          <span>CONFIRMAR PEDIDO Y VER SEGUIMIENTO GPS</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Yape Modal Component */}
      <YapeModal
        abierto={modalYapeAbierto}
        onCerrar={() => setModalYapeAbierto(false)}
        monto={total}
        onConfirmarPago={cod => {
          if (cod) setCodigoOperacionYape(cod);
          setModalYapeAbierto(false);
        }}
      />
    </div>
  );
};
