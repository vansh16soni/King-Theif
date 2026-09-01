const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('rmcs_token');
}

function getAdminToken() {
  return localStorage.getItem('rmcs_admin_token');
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

async function adminRequest(path, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const adminToken = getAdminToken();
  if (adminToken) {
    headers.Authorization = `Bearer ${adminToken}`;
  }
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Admin request failed');
  return data;
}

export const api = {
  // Player Auth
  register: (username, password) => request('/auth/register', { method: 'POST', body: { username, password }, auth: false }),
  login: (username, password) => request('/auth/login', { method: 'POST', body: { username, password }, auth: false }),
  me: () => request('/auth/me'),

  // Game & Rooms
  createRoom: (totalRounds) => request('/rooms/create', { method: 'POST', body: { totalRounds } }),
  joinRoom: (roomCode) => request('/rooms/join', { method: 'POST', body: { roomCode } }),
  getRoom: (code) => request(`/rooms/${code}`),
  getHistory: (roomCode) => request(`/game/${roomCode}/history`),

  // Admin Portal
  adminLogin: (username, password) =>
    request('/admin/login', { method: 'POST', body: { username, password }, auth: false }),
  getAdminOverview: () => adminRequest('/admin/overview'),
  getAdminPlayers: (query = '', sort = 'totalPoints', order = 'desc') =>
    adminRequest(`/admin/players?q=${encodeURIComponent(query)}&sort=${sort}&order=${order}`),
  getAdminPlayer: (id) => adminRequest(`/admin/players/${id}`),
  deletePlayer: (id) => adminRequest(`/admin/players/${id}`, { method: 'DELETE' })
};

export { getToken, getAdminToken };
