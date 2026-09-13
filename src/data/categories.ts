import { CategoriaTipo } from '../types';

export interface CategoriaConfig {
  id: CategoriaTipo;
  label: string;
  icono: string;
  descripcion?: string;
}

export const TODAS_CATEGORIAS: CategoriaConfig[] = [
  { id: 'Todos', label: 'Todos', icono: '⭐', descripcion: 'Toda nuestra carta' },
  { id: 'Promos', label: 'Promos 2x20', icono: '🔥', descripcion: 'Combos y ofertas imperdibles' },
  { id: 'Hamburguesas', label: 'Hamburguesas', icono: '🍔', descripcion: '100% carne artesanal' },
  { id: 'Perros', label: 'Perros', icono: '🌭', descripcion: 'Salchicha jumbo con todo' },
  { id: 'Pepitos', label: 'Pepitos', icono: '🥖', descripcion: 'Baguette 30cm gratinado' },
  { id: 'Acompañamientos', label: 'Papas & Más', icono: '🍟', descripcion: 'Crujientes y para compartir' },
  { id: 'Bebidas', label: 'Bebidas', icono: '🥤', descripcion: 'Refrescantes bien heladas' },
];
