import { Router } from "express";
import productsRouter from "./products.routes.js";
import cartsRouter from "./carts.routes.js";

const router = Router(); // Inicializamos el router

router.use("/products", productsRouter); // Indicamos que todas las rutas que empiecen con /products van a ser manejadas por el router de products
router.use("/carts", cartsRouter); // Indicamos que todas las rutas que empiecen con /carts van a ser manejadas por el router de carts

export default router; // Exportamos el router para poder utilizarlo en otros archivos