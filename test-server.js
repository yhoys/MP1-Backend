console.log('1. Iniciando...');
import express from 'express';
console.log('2. Express importado');
import dotenv from 'dotenv';
console.log('3. Dotenv importado');
dotenv.config();
console.log('4. Dotenv configurado');
console.log('5. DB_HOST:', process.env.DB_HOST);
console.log('6. DB_NAME:', process.env.DB_NAME);

import { connectDB } from './src/config/database.js';
console.log('7. Database module importado');

const app = express();
const PORT = 3001;

console.log('8. Creando servidor...');
connectDB().then(() => {
  console.log('9. Conectado a BD');
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });
  
  app.listen(PORT, () => {
    console.log(`✅ Servidor en http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
