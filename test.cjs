const express = require('express');
console.log('1. Express cargado');
const app = express();
console.log('2. App creada');

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(3001, () => {
  console.log('✅ Servidor en puerto 3001');
});
