import React, { useState } from 'react';
import {
  Home,
  UtensilsCrossed,
  ShoppingBag,
  Clock,
  Navigation,
} from 'lucide-react';
import { UserProvider } from './context/UserContext';
import { CartProvider, useCart } from './context/CartContext';
import { OrdersProvider, useOrders } from './context/OrdersContext';
import { ScreenBackground } from './components/ScreenBackground';
import { Navbar } from './components/Navbar';
import { SideMenu } from './components/SideMenu';
import { ProductDetailModal } from './components/ProductDetailModal';
import { HomeScreen } from './screens/HomeScreen';
import { MenuScreen } from './screens/MenuScreen';
import { CartScreen } from './screens/CartScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { OrderTrackingScreen } from './screens/OrderTrackingScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { CourierVerifyScreen } from './screens/CourierVerifyScreen';
import { AccountScreen } from './screens/AccountScreen';
import { Producto, CategoriaTipo } from './types';

function MainApp() {
  const [pantallaActual, setPantallaActual] = useState<string>('home');
  const [menuLateralAbierto, setMenuLateralAbierto] = useState<boolean>(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<CategoriaTipo>('Todos');
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  const { cantidadTotal, total } = useCart();
  const { pedidoActivo } = useOrders();

  const handleSeleccionarProducto = (prod: Producto) => {
    setProductoSeleccionado(prod);
  };

  const handleCerrarModalProducto = () => {
    setProductoSeleccionado(null);
  };

  const navegarA = (pantalla: string) => {
    setPantallaActual(pantalla);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ScreenBackground>
      {/* App Navbar */}
      <Navbar
        pantallaActual={pantallaActual}
        onAbrirMenu={() => setMenuLateralAbierto(true)}
        onNavegar={navegarA}
      />

      {/* Main Screen Content View */}
      <main className="flex-1 flex flex-col">
        {pantallaActual === 'home' && (
          <HomeScreen
            onNavegar={navegarA}
            onSeleccionarProducto={handleSeleccionarProducto}
          />
        )}

        {pantallaActual === 'menu' && (
          <MenuScreen
            categoriaSeleccionada={categoriaSeleccionada}
            onCambiarCategoria={setCategoriaSeleccionada}
            onSeleccionarProducto={handleSeleccionarProducto}
          />
        )}

        {pantallaActual === 'cart' && (
          <CartScreen onNavegar={navegarA} />
        )}

        {pantallaActual === 'checkout' && (
          <CheckoutScreen onNavegar={navegarA} />
        )}

        {pantallaActual === 'tracking' && (
          <OrderTrackingScreen onNavegar={navegarA} />
        )}

        {pantallaActual === 'orders' && (
          <OrdersScreen onNavegar={navegarA} />
        )}

        {pantallaActual === 'courier' && (
          <CourierVerifyScreen onNavegar={navegarA} />
        )}

        {pantallaActual === 'account' && (
          <AccountScreen />
        )}
      </main>

      {/* Bottom Floating Quick Cart Bar if items exist and not on Cart/Checkout */}
      {cantidadTotal > 0 && pantallaActual !== 'cart' && pantallaActual !== 'checkout' && (
        <div
          id="floating-quick-cart"
          className="fixed bottom-[74px] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[380px] z-30 animate-in slide-in-from-bottom-3 duration-200"
        >
          <button
            type="button"
            onClick={() => navegarA('cart')}
            className="w-full bg-[#F7B63F] hover:bg-[#e0a331] active:scale-[0.99] text-black font-black py-3 px-4 rounded-2xl flex items-center justify-between shadow-2xl shadow-black/80 transition-transform cursor-pointer border border-[#F7B63F]/40"
          >
            <div className="flex items-center gap-2">
              <span className="bg-black text-white text-[11px] font-black px-2 py-0.5 rounded-lg">
                {cantidadTotal} {cantidadTotal === 1 ? 'ítem' : 'ítems'}
              </span>
              <span className="text-xs uppercase tracking-wider font-extrabold">
                Ver Carrito
              </span>
            </div>
            <span className="text-sm font-black">
              S/ {total.toFixed(2)} →
            </span>
          </button>
        </div>
      )}

      {/* Bottom Tab Bar Navigation */}
      <nav
        id="bottom-tab-navigation"
        aria-label="Navegación inferior"
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#0c0c0c]/90 backdrop-blur-lg border-t border-[#262020] px-2 py-1.5 flex items-center justify-around z-40"
      >
        <button
          id="tab-btn-home"
          type="button"
          onClick={() => navegarA('home')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            pantallaActual === 'home' ? 'text-[#F7B63F]' : 'text-[#777] hover:text-white'
          }`}
        >
          <Home size={18} />
          <span className="text-[10px] font-bold">Inicio</span>
        </button>

        <button
          id="tab-btn-menu"
          type="button"
          onClick={() => navegarA('menu')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            pantallaActual === 'menu' ? 'text-[#F7B63F]' : 'text-[#777] hover:text-white'
          }`}
        >
          <UtensilsCrossed size={18} />
          <span className="text-[10px] font-bold">Carta</span>
        </button>

        <button
          id="tab-btn-cart"
          type="button"
          onClick={() => navegarA('cart')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer relative ${
            pantallaActual === 'cart' ? 'text-[#F7B63F]' : 'text-[#777] hover:text-white'
          }`}
        >
          <ShoppingBag size={18} />
          <span className="text-[10px] font-bold">Carrito</span>
          {cantidadTotal > 0 && (
            <span className="absolute top-0.5 right-2 bg-[#E53935] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {cantidadTotal}
            </span>
          )}
        </button>

        <button
          id="tab-btn-orders"
          type="button"
          onClick={() => navegarA('orders')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            pantallaActual === 'orders' ? 'text-[#F7B63F]' : 'text-[#777] hover:text-white'
          }`}
        >
          <Clock size={18} />
          <span className="text-[10px] font-bold">Pedidos</span>
        </button>

        <button
          id="tab-btn-tracking"
          type="button"
          onClick={() => navegarA('tracking')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer relative ${
            pantallaActual === 'tracking' ? 'text-[#F7B63F]' : 'text-[#777] hover:text-white'
          }`}
        >
          <Navigation size={18} />
          <span className="text-[10px] font-bold">GPS En Vivo</span>
          {pedidoActivo && pedidoActivo.estado !== 'entregado' && (
            <span className="absolute top-0.5 right-2 w-2 h-2 bg-[#22C55E] rounded-full animate-ping" />
          )}
        </button>
      </nav>

      {/* Drawer SideMenu Component */}
      <SideMenu
        abierto={menuLateralAbierto}
        onCerrar={() => setMenuLateralAbierto(false)}
        onNavegar={navegarA}
        pantallaActual={pantallaActual}
      />

      {/* Product Customizer Modal */}
      <ProductDetailModal
        producto={productoSeleccionado}
        abierto={Boolean(productoSeleccionado)}
        onCerrar={handleCerrarModalProducto}
      />
    </ScreenBackground>
  );
}

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <OrdersProvider>
          <MainApp />
        </OrdersProvider>
      </CartProvider>
    </UserProvider>
  );
}
