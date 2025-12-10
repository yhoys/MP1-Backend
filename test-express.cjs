console.log('Inicio');
const express = require('express');
console.log('Express importado');
const app = express();
console.log('App creada');

app.get('/health', (req, res) => {
  console.log('Request recibido');
  res.json({ ok: true });
});

const server = app.listen(3001, '0.0.0.0', () => {
  console.log('✅ Servidor escuchando en 0.0.0.0:3001');
});

setTimeout(() => {
  console.log('Cerrando servidor...');
  server.close();
}, 8000);
