console.error('START');

import('./src/config/database.js')
  .then(db => {
    console.error('Database module loaded');
    return db.connectDB();
  })
  .then(() => {
    console.error('Connected!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err.message);
    console.error(err.stack);
    process.exit(1);
  });

console.error('END');
