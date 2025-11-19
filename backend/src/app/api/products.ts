import { Router, Request, Response } from 'express';
const router: Router = Router();

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
}

const products: Product[] = [
  { id: 1, name: "Flared Jeans", price: 89, image: "/images/jeans.jpg", type: "clothes" },
  { id: 2, name: "Ralph Lauren Mütze", price: 59, image: "/images/muetze.jpg", type: "accessories" },
  { id: 3, name: "Ami Paris Pullover", price: 149, image: "/images/pullover.jpg", type: "clothes" },
  { id: 4, name: "Louis Vuitton Schuhe", price: 799, image: "/images/schuhe.jpg", type: "shoes" }
];

// Route liefert alle Produkte
router.get('/products', (req: Request, res: Response) => {
  res.json(products);
});

export default router;
