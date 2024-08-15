import { productModel } from "../dao/mongoDB/models/product.model.js"; // Importar como exportación nombrada

import fs from 'fs';
import mongoose from 'mongoose';
import { connectMongoDB } from "../config/mongoDB.config.js"; // Ubicación del archivo de configuración de la base de datos

const importProducts = async () => {
    try {
        // Conectar a la base de datos
        await connectMongoDB();

        // Leer el archivo JSON
        const productsData = await fs.promises.readFile('./products.json', 'utf-8');
        const products = JSON.parse(productsData);

        // Insertar productos en la base de datos
        await productModel.insertMany(products);
        console.log('Productos importados con éxito.');

        // Cerrar la conexión
        mongoose.connection.close();
    } catch (error) {
        console.error('Error al importar productos:', error);
        mongoose.connection.close();
    }
};

importProducts();


// Lo ejecutamos con el comando: node src/scripts/importDB_Products.js para importar los productos a la base de datos.