import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const productos = [
  {
    id: 1,
    nombre: 'Hamburguesa El Pana',
    categoria: 'Hamburguesas',
    precio: 24,
    icono: '🍔',
  },
  {
    id: 2,
    nombre: 'Doble Pana',
    categoria: 'Hamburguesas',
    precio: 29.9,
    icono: '🍔',
  },
  {
    id: 3,
    nombre: 'Perro Especial',
    categoria: 'Perros',
    precio: 15,
    icono: '🌭',
  },
  {
    id: 4,
    nombre: 'Pepito de Pollo',
    categoria: 'Pepitos',
    precio: 18.5,
    icono: '🥖',
  },
];

const categorias = [
  ['Todos', '🔥'],
  ['Hamburguesas', '🍔'],
  ['Perros', '🌭'],
  ['Pepitos', '🥖'],
];

export default function App() {
  const [categoria, setCategoria] = useState('Todos');
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const lista =
    categoria === 'Todos'
      ? productos
      : productos.filter(p => p.categoria === categoria);

  const agregar = producto => {
    setCarrito(actual => {
      const existe = actual.find(p => p.id === producto.id);

      if (existe) {
        return actual.map(p =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }

      return [...actual, { ...producto, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id, cambio) => {
    setCarrito(actual =>
      actual
        .map(p =>
          p.id === id
            ? { ...p, cantidad: p.cantidad + cambio }
            : p
        )
        .filter(p => p.cantidad > 0)
    );
  };

  const cantidadTotal = carrito.reduce(
    (suma, p) => suma + p.cantidad,
    0
  );

  const total = carrito.reduce(
    (suma, p) => suma + p.precio * p.cantidad,
    0
  );

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <View>
          <Text style={styles.bienvenido}>BIENVENIDO A</Text>
          <Text style={styles.logo}>EL PANA BURGER</Text>
        </View>

        <Pressable
          style={styles.carritoBtn}
          onPress={() => setMostrarCarrito(true)}
        >
          <Text style={styles.carritoIcon}>🛒</Text>

          {cantidadTotal > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cantidadTotal}</Text>
            </View>
          )}
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.contenido}>
        <View style={styles.hero}>
          <Text style={styles.burger}>🍔</Text>

          <Text style={styles.heroTitulo}>
            MÁS QUE HAMBURGUESAS
          </Text>

          <Text style={styles.dorado}>SOMOS SABOR</Text>

          <Text style={styles.descripcion}>
            Pide tus favoritos directamente desde tu celular.
          </Text>
        </View>

        <Text style={styles.titulo}>Categorías</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {categorias.map(([nombre, icono]) => (
            <Pressable
              key={nombre}
              onPress={() => setCategoria(nombre)}
              style={[
                styles.categoria,
                categoria === nombre && styles.categoriaActiva,
              ]}
            >
              <Text style={styles.categoriaIcon}>{icono}</Text>
              <Text style={styles.categoriaTexto}>{nombre}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.titulo}>
          {categoria === 'Todos' ? 'Populares' : categoria}
        </Text>

        {lista.map(producto => (
          <View style={styles.producto} key={producto.id}>
            <View style={styles.imagen}>
              <Text style={styles.productoIcon}>
                {producto.icono}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.nombre}>
                {producto.nombre}
              </Text>

              <Text style={styles.precio}>
                S/ {producto.precio.toFixed(2)}
              </Text>
            </View>

            <Pressable
              style={styles.agregar}
              onPress={() => agregar(producto)}
            >
              <Text style={styles.mas}>+</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={mostrarCarrito}
        transparent
        animationType="slide"
        onRequestClose={() => setMostrarCarrito(false)}
      >
        <View style={styles.fondoModal}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>Tu pedido</Text>

              <Pressable
                onPress={() => setMostrarCarrito(false)}
              >
                <Text style={styles.cerrar}>✕</Text>
              </Pressable>
            </View>

            {carrito.length === 0 ? (
              <View style={styles.vacio}>
                <Text style={styles.vacioIcon}>🛒</Text>
                <Text style={styles.vacioTexto}>
                  Tu carrito está vacío
                </Text>
              </View>
            ) : (
              <>
                <ScrollView>
                  {carrito.map(producto => (
                    <View
                      key={producto.id}
                      style={styles.itemCarrito}
                    >
                      <Text style={styles.itemIcon}>
                        {producto.icono}
                      </Text>

                      <View style={styles.itemInfo}>
                        <Text style={styles.itemNombre}>
                          {producto.nombre}
                        </Text>

                        <Text style={styles.precio}>
                          S/ {producto.precio.toFixed(2)}
                        </Text>
                      </View>

                      <Pressable
                        style={styles.cantidadBtn}
                        onPress={() =>
                          cambiarCantidad(producto.id, -1)
                        }
                      >
                        <Text style={styles.cantidadTexto}>−</Text>
                      </Pressable>

                      <Text style={styles.cantidad}>
                        {producto.cantidad}
                      </Text>

                      <Pressable
                        style={styles.cantidadBtn}
                        onPress={() =>
                          cambiarCantidad(producto.id, 1)
                        }
                      >
                        <Text style={styles.cantidadTexto}>+</Text>
                      </Pressable>
                    </View>
                  ))}
                </ScrollView>

                <View style={styles.totalBox}>
                  <Text style={styles.totalTexto}>TOTAL</Text>

                  <Text style={styles.totalPrecio}>
                    S/ {total.toFixed(2)}
                  </Text>
                </View>

                <Pressable style={styles.pedir}>
                  <Text style={styles.pedirTexto}>
                    REALIZAR PEDIDO →
                  </Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#090909',
  },

  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#242424',
  },

  bienvenido: {
    color: '#777',
    fontSize: 9,
    letterSpacing: 3,
  },

  logo: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 4,
  },

  carritoBtn: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
  },

  carritoIcon: {
    fontSize: 25,
  },

  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: '#E53935',
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 11,
  },

  contenido: {
    padding: 17,
    paddingBottom: 50,
  },

  hero: {
    padding: 25,
    borderRadius: 27,
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#303030',
    alignItems: 'center',
  },

  burger: {
    fontSize: 85,
  },

  heroTitulo: {
    color: '#FFF',
    fontSize: 23,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 12,
  },

  dorado: {
    color: '#F7B63F',
    fontSize: 29,
    fontWeight: '900',
    marginTop: 7,
  },

  descripcion: {
    color: '#999',
    textAlign: 'center',
    marginTop: 15,
  },

  titulo: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: '900',
    marginTop: 27,
    marginBottom: 15,
  },

  categoria: {
    width: 110,
    height: 110,
    backgroundColor: '#171717',
    borderRadius: 20,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },

  categoriaActiva: {
    borderColor: '#F7B63F',
  },

  categoriaIcon: {
    fontSize: 38,
  },

  categoriaTexto: {
    color: '#DDD',
    marginTop: 8,
    fontSize: 12,
    fontWeight: '800',
  },

  producto: {
    backgroundColor: '#171717',
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  imagen: {
    width: 75,
    height: 75,
    borderRadius: 17,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },

  productoIcon: {
    fontSize: 44,
  },

  info: {
    flex: 1,
    paddingHorizontal: 13,
  },

  nombre: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '900',
  },

  precio: {
    color: '#F7B63F',
    fontWeight: '900',
    marginTop: 7,
  },

  agregar: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: '#F7B63F',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mas: {
    fontSize: 27,
    fontWeight: '900',
  },

  fondoModal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,.75)',
  },

  modal: {
    backgroundColor: '#111',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: '80%',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modalTitulo: {
    color: '#FFF',
    fontSize: 27,
    fontWeight: '900',
  },

  cerrar: {
    color: '#FFF',
    fontSize: 24,
  },

  vacio: {
    paddingVertical: 70,
    alignItems: 'center',
  },

  vacioIcon: {
    fontSize: 60,
  },

  vacioTexto: {
    color: '#AAA',
    marginTop: 15,
  },

  itemCarrito: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#272727',
  },

  itemIcon: {
    fontSize: 35,
    marginRight: 10,
  },

  itemInfo: {
    flex: 1,
  },

  itemNombre: {
    color: '#FFF',
    fontWeight: '800',
  },

  cantidadBtn: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: '#292929',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cantidadTexto: {
    color: '#FFF',
    fontSize: 20,
  },

  cantidad: {
    color: '#FFF',
    width: 32,
    textAlign: 'center',
    fontWeight: '900',
  },

  totalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },

  totalTexto: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
  },

  totalPrecio: {
    color: '#F7B63F',
    fontSize: 23,
    fontWeight: '900',
  },

  pedir: {
    backgroundColor: '#F7B63F',
    padding: 17,
    borderRadius: 16,
    alignItems: 'center',
  },

  pedirTexto: {
    color: '#111',
    fontWeight: '900',
  },
});
