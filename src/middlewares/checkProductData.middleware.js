import { request, response } from "express";
import productDao from "../dao/mongoDB/product.dao.js";

export const checkProductData = async (req = request, res = response, next) => { // Middleware para validar los datos de un producto
    try {
        const { title, description, price, thumbnail, code, stock, category } = req.body; // Obtenemos los datos del body
        const newProduct = { // Creamos un nuevo producto
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
        };

        const products = await productDao.getAll(); // Obtenemos los productos
        // Validar que no se repita el campo de code
        const productExists = products.find((p) => p.code === code); // Buscamos si el producto ya existe
        if (productExists) return res.status(400).json({ status: "Error", msg: `El producto con el código ${code} ya existe` }); // Si el producto ya existe, respondemos con un error

        // Validamos que los campos sean obligatorios
        const checkData = Object.values(newProduct).includes(undefined); // Validamos que los campos sean obligatorios
        if (checkData) return res.status(400).json({ status: "Error", msg: "Todos los datos son obligatorios" }); // Si los campos son obligatorios, respondemos con un error

        next(); // Si todo esta correcto, continuamos
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" }); // Si hay un error, respondemos con un error
    }
};