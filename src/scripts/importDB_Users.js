import { userModel } from "../dao/mongoDB/models/user.model.js"; // Importar como exportación nombrada

import fs from 'fs';
import mongoose from 'mongoose';
import { connectMongoDB } from "../config/mongoDB.config.js"; // Ubicación del archivo de configuración de la base de datos

const importUsers = async () => {
    try {
        // Conectar a la base de datos
        await connectMongoDB();

        // Leer el archivo JSON
        const usersData = await fs.promises.readFile('./src/scripts/users.json', 'utf-8'); // Asegúrate de que la ruta sea correcta
        const users = JSON.parse(usersData);

        // Insertar estudiantes en la base de datos
        await userModel.insertMany(users);
        console.log('Estudiantes importados con éxito.');

        // Cerrar la conexión
        mongoose.connection.close();
    } catch (error) {
        console.error('Error al importar estudiantes:', error);
        mongoose.connection.close();
    }
};

importUsers();


// Lo ejecutamos con el comando: node src/scripts/importDB_Users.js para importar los useros a la base de datos.