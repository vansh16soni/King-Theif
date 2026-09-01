const jwt = require('jsonwebtoken');

// Socket.io middleware: verifies JWT sent in the handshake auth payload.
function socketAuth(socket, next) {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('Authentication required'));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;
    socket.username = decoded.username;
    next();
  } catch (err) {
    next(new Error('Invalid or expired token'));
  }
}

module.exports = socketAuth;
