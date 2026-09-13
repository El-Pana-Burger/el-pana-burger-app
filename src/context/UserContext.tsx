import React, { createContext, useContext, useState, useEffect } from 'react';
import { UsuarioPerfil } from '../types';

interface UserContextType {
  usuario: UsuarioPerfil;
  actualizarPerfil: (datos: Partial<UsuarioPerfil>) => void;
}

const PERFIL_DEFAULT: UsuarioPerfil = {
  nombre: 'Pana Amigo',
  telefono: '987 123 456',
  direccion: 'Calle Los Pinos 142, Miraflores',
  referencia: 'Cerca al parque principal, timbre 2B',
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<UsuarioPerfil>(() => {
    try {
      const guardado = localStorage.getItem('el_pana_user');
      return guardado ? JSON.parse(guardado) : PERFIL_DEFAULT;
    } catch {
      return PERFIL_DEFAULT;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('el_pana_user', JSON.stringify(usuario));
    } catch (e) {
      console.error(e);
    }
  }, [usuario]);

  const actualizarPerfil = (datos: Partial<UsuarioPerfil>) => {
    setUsuario(prev => ({ ...prev, ...datos }));
  };

  return (
    <UserContext.Provider value={{ usuario, actualizarPerfil }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de UserProvider');
  }
  return context;
};
