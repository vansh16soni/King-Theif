import { io } from 'socket.io-client';

export const getSocketUrl = () => {
  const envUrl = import.meta.env.VITE_SOCKET_URL;
  if (typeof window !== 'undefined') {
    const { hostname, protocol } = window.location;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

    if (envUrl) {
      const isEnvLocal = envUrl.includes('localhost') || envUrl.includes('127.0.0.1');
      if (!isLocalhost && isEnvLocal) {
        return `${protocol}//${hostname}:5000`;
      }
      return envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
    }

    if (isLocalhost) return 'http://localhost:5000';
    return `${protocol}//${hostname}:5000`;
  }
  return envUrl || 'http://localhost:5000';
};

let socket = null;

export function connectSocket(token) {
  if (socket?.connected) {
    return socket;
  }
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  const socketUrl = getSocketUrl();
  socket = io(socketUrl, {
    auth: { token },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 15,
    reconnectionDelay: 1000,
    timeout: 10000
  });

  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
