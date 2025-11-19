import express from 'express';
import productsRouter from './api/products'; // products.ts importieren

const app = express();

// Public folder für Bilder
app.use('/images', express.static('public/images'));

// API-Routen
app.use('/api', productsRouter);

// Server starten
const PORT = 3000;
app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));
