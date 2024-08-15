import { studentModel } from "../dao/mongoDB/models/student.model.js"; // Importar como exportación nombrada

import fs from 'fs';
import mongoose from 'mongoose';
import { connectMongoDB } from "../config/mongoDB.config.js"; // Ubicación del archivo de configuración de la base de datos

const importStudents = async () => {
    try {
        // Conectar a la base de datos
        await connectMongoDB();

        // Leer el archivo JSON
        const studentsData = await fs.promises.readFile('./src/scripts/students.json', 'utf-8'); // Asegúrate de que la ruta sea correcta
        const students = JSON.parse(studentsData);

        // Insertar estudiantes en la base de datos
        await studentModel.insertMany(students);
        console.log('Estudiantes importados con éxito.');

        // Cerrar la conexión
        mongoose.connection.close();
    } catch (error) {
        console.error('Error al importar estudiantes:', error);
        mongoose.connection.close();
    }
};

importStudents();


// Lo ejecutamos con el comando: node src/scripts/importDB_Students.js para importar los studentos a la base de datos.