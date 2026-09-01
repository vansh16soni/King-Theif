import React, { createContext, useContext, useEffect, useState } from 'react';
import { connectSocket, disconnectSocket } from '../utils/socket';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { token } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!token) {
      disconnectSocket();
      setSocket(null);
      return;
    }
    const s = connectSocket(token);
    setSocket(s);
    return () => disconnectSocket();
  }, [token]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  return useContext(SocketContext);
}
