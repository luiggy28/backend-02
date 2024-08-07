import { Router } from "express";
import productManager from "../dao/fileSystem/productManager.js";
import { io } from "../app.js";

const router = Router(); // Inicializamos el router

router.get("/", async (req, res) => { // Ruta para obtener todos los productos
    try {
        const products = await productManager.getProducts(); // Obtenemos los productos
        res.render("home", { products }); // Respondemos con los productos
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error interno del servidor" }); // Si hay un error, respondemos con un error
    }
});

router.get("/realtimeproducts", async (req, res) => { // Ruta para obtener todos los productos
    try {
        const products = await productManager.getProducts(); // Obtenemos los productos
        if (products) {
            io.emit("products", products); // Enviamos los productos a todos los clientes conectados
        }
        res.render("realTimeProducts"); // Respondemos con los productos
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error interno del servidor" }); // Si hay un error, respondemos con un error
    }
});

router.post("/realtimeproducts", async (req, res) => { // Ruta para agregar un producto
    try {
        const { title, price, description } = req.body; // Obtenemos el body de la petición
        await productManager.addProduct({ title, price, description }); // Agregamos el producto
        const products = await productManager.getProducts(); // Obtenemos los productos
        io.emit("products", products); // Enviamos los productos a todos los clientes conectados

        res.render("realTimeProducts"); // Respondemos con los productos
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error interno del servidor" }); // Si hay un error, respondemos con un error
    }
});

router.delete("/realtimeproducts", async (req, res) => { // Ruta para eliminar un producto por id
    try {
        const { id } = req.body; // Obtenemos el id del producto
        await productManager.deleteProduct(Number(id)); // Eliminamos el producto por id
        const products = await productManager.getProducts(); // Obtenemos los productos
        io.emit("products", products); // Enviamos los productos a todos los clientes conectados

        res.render("realTimeProducts"); // Respondemos con los productos
    } catch (error) { 
        console.log(error);
        res.status(500).json({ error: "Error interno del servidor" }); // Si hay un error, respondemos con un error
    }
});

export default router; // Exportamos el router