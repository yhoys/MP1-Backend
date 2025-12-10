import express from 'express';
import pg from 'pg';

console.log('1. Importaciones completas');

const app = express();
console.log('2. App creada');

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

console.log('3. Rutas configuradas');

const server = app.listen(3001, '0.0.0.0', () => {
  console.log('✅ Servidor en puerto 3001');
});

console.log('4. Listen ejecutado');
