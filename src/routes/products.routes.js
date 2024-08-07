import { Router } from "express";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import productDao from "../dao/mongoDB/product.dao.js";

const router = Router(); // Inicializamos el router

router.get("/", async (req, res) => { // Ruta para obtener todos los productos
    try {
        const products = await productDao.getAll();
        res.status(200).json({ status: "success", products }); // Respondemos con los productos
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" }); // Si hay un error, respondemos con un error
    }
});

router.get("/:pid", async (req, res) => { // Ruta para obtener un producto por id
    try {
        const { pid } = req.params; // Obtenemos el id del producto
        const product = await productDao.getById(pid); // Buscamos el producto por id
        if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" }); // Si no se encuentra el producto, respondemos con un error

        res.status(200).json({ status: "success", product }); // Respondemos con el producto encontrado
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" }); // Si hay un error, respondemos con un error
    }
});

router.delete("/:pid", async (req, res) => { // Ruta para eliminar un producto por id
    try {
        const { pid } = req.params;
        const product = await productDao.deleteOne(pid); // Eliminamos el producto por id
        if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" }); // Si no se encuentra el producto, respondemos con un error

        res.status(200).json({ status: "success", msg: `El producto con el id ${pid} fue eliminado` }); // Respondemos con el producto eliminado
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" }); // Si hay un error, respondemos con un error
    }
});

router.put("/:pid", async (req, res) => { // Ruta para actualizar un producto por id
    try {
        const { pid } = req.params; 
        const productData = req.body
        const product = await productDao.update(pid, productData);
        if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" }); 

        res.status(200).json({ status: "success", product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" }); // Si hay un error, respondemos con un error
    }
});

router.post("/", checkProductData, async (req, res) => { // Ruta para agregar un producto
    try {
        const productData = req.body; // Obtenemos el body de la petición
        const product = await productDao.create(productData); // Agregamos el producto

        res.status(201).json({ status: "success", product }); // Respondemos con el producto creado
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" }); // Si hay un error, respondemos con un error
    }
});


export default router; // Exportamos el router