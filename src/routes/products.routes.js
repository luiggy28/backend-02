import { Router } from "express";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import productDao from "../dao/mongoDB/product.dao.js";
import { productModel } from "../dao/mongoDB/models/product.model.js";

const router = Router(); // Inicializamos el router

router.get("/", async (req, res) => {
    try {
        
        const products = await productModel.find();

        res.status(200).json({ status: "success", payload: products });


    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({status: "Error", msg: "Internal server error"})
    }
});

router.get("/:pid", async (req, res) => { 
    
    try {

        const { pid } = req.params;
        const product = await productModel.findById(pid);
        if(!product) return res.status(400).json({status: "Error", msg: "Product not found"});

        res.status(200).json({ status: "success", payload: product });
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({status: "Error", msg: "Internal server error"})
    }
});

router.post("/", async (req, res) => {

    try {

        const productData = req.body;
        const product = await productModel.create(productData);

        res.status(200).json({ status: "success", payload: product });
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({status: "Error", msg: "Internal server error"})
    }
    
});

router.put("/:id", async (req, res) => {

    try {
        const { id } = req.params;
        const body = req.body;
        const product = await productModel.findByIdAndUpdate(id, body);
        const productUpdate = await productModel.findById(id);

        res.status(200).json({ status: "success", payload: productUpdate });
        
    } catch (error) {
        console.log(error);
    }
    
});

router.delete("/:id", async (req, res) => {

    try {
        const { id } = req.params;

        const product = await productModel.deleteOne({_id: id});

        res.json({ status: "success", payload: "Alumno eliminado con éxito" });
        
    } catch (error) {
        console.log(error);
    }
    
});


export default router; // Exportamos el router