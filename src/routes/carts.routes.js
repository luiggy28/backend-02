import { Router } from "express";
import cartManager from "../cartManager.js";
import productManager from "../productManager.js";

const router = Router(); // Inicializamos el router

router.post("/", async (req, res) => { // Ruta para crear un carrito
    try {
        const cart = await cartManager.createCart(); // Creamos un carrito

        res.status(201).json({ status: "success", cart }); // Respondemos con el carrito creado
    } catch (error) { // Si hay un error
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" }); // Respondemos con un error
    }
});

router.get("/:cid", async (req, res) => { // Ruta para obtener un carrito por id
    try {
        const { cid } = req.params; // Obtenemos el id del carrito
        const cart = await cartManager.getCartById(Number(cid)); // Buscamos el carrito por id
        if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });  // Si no se encuentra el carrito, respondemos con un error

        res.status(200).json({ status: "success", cart }); // Respondemos con el carrito encontrado
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });   // Si hay un error, respondemos con un error
    }
});

router.post("/:cid/product/:pid", async (req, res) => { // Ruta para agregar un producto a un carrito
    try {
        const { cid, pid } = req.params; // Obtenemos el id del carrito y el id del producto

        const product = await productManager.getProductById(Number(pid)); // Buscamos el producto por id
        if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" }); // Si no se encuentra el producto, respondemos con un error

        const cart = await cartManager.addProductToCart(Number(cid), Number(pid)); // Agregamos el producto al carrito
        if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" }); // Si no se encuentra el carrito, respondemos con un error

        res.status(200).json({ status: "success", cart }); // Respondemos con el carrito actualizado
    } catch (error) { 
        console.log(error); 
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" }); // Si hay un error, respondemos con un error
    }
});

export default router; // Exportamos el router