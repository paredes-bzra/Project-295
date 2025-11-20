import express from 'express';
import productsRouter from './api/products'; 

const app = express();


app.use('/images', express.static('public/images'));


app.use('/api', productsRouter);


const PORT = 3000;
app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));
