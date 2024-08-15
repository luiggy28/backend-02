import { userModel } from "../dao/mongoDB/models/user.model.js";
import fs from 'fs';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { connectMongoDB } from "../config/mongoDB.config.js"; // Ubicación del archivo de configuración de la base de datos

const importUsers = async () => {
    try {
        // Conectar a la base de datos
        await connectMongoDB();

        // Leer el archivo JSON
        const usersData = await fs.promises.readFile('./src/scripts/users.json', 'utf-8');
        const users = JSON.parse(usersData);

        // Encriptar las contraseñas antes de insertar en la base de datos
        const usersWithHashedPasswords = await Promise.all(users.map(async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            return user;
        }));

        // Insertar los usuarios en la base de datos
        await userModel.insertMany(usersWithHashedPasswords);
        console.log('Usuarios importados con éxito.');

        // Cerrar la conexión
        mongoose.connection.close();
    } catch (error) {
        console.error('Error al importar usuarios:', error);
        mongoose.connection.close();
    }
};

importUsers();



// Lo ejecutamos con el comando: node src/scripts/importDB_Users.js para importar los usuarios a la base de datos, con los password encriptados.