const io = require('socket.io-client');

// URL del servidor en producción
const SERVER_URL = 'wss://didactec.com.co';

console.log(`Conectando a WebSocket en ${SERVER_URL}...`);

const socket = io(SERVER_URL, {
  transports: ['websocket'], // Forzar uso de WebSockets
  reconnection: true,        // Habilitar reconexión automática
  reconnectionAttempts: 5,   // Intentos de reconexión
  timeout: 5000,             // Tiempo de espera para conexión
});

socket.on('connect', () => {
  console.log('✅ Conectado al servidor WebSocket');

  // Enviar un mensaje de prueba
  socket.emit('new-message', { text: '¡Hola desde el cliente de prueba!', author: 'Tester' });
});

socket.on('messages', (data) => {
  console.log('📩 Mensajes recibidos:', data);
});

socket.on('disconnect', () => {
  console.log('❌ Desconectado del servidor WebSocket');
});

socket.on('connect_error', (err) => {
  console.error('⚠️ Error de conexión:', err.message);
});
