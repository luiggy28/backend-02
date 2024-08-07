let products = [];

import fs from "fs";

const pathFile = "./src/data/products.json"; //ruta del archivo

const addProduct = async (product) => { //agrega un producto
    await getProducts(); //lee el archivo
    const { title, description, price, thumbnail, code, stock, category } = product; //extrae los datos del producto
    const newProduct = { //crea el producto
        id: products.length + 1,
        title,
        description,
        price,
        thumbnail: thumbnail || [],
        code,
        stock,
        category,
        status: true,
    };

    products.push(newProduct); //agrega el producto al array de productos

    await fs.promises.writeFile(pathFile, JSON.stringify(products)); //escribe el archivo

    return product; //devuelve el producto
};

const getProducts = async (limit) => { //obtiene los productos
    const productsJson = await fs.promises.readFile(pathFile, "utf8"); //lee el archivo
    const productsParse = JSON.parse(productsJson); //parsea el archivo
    products = productsParse || []; //si no hay productos, crea un array vacio

    if (!limit) return products; //si no hay limite, devuelve todos los productos

    return products.slice(0, limit); //devuelve los productos hasta el limite
};

const getProductById = async (id) => { //busca un producto por id
    products = await getProducts(); //lee el archivo
    const product = products.find((p) => p.id === id); //busca el producto por id

    return product; //devuelve el producto
};

const updateProduct = async (id, productData) => { //actualiza un producto
    await getProducts(); //lee el archivo

    const index = products.findIndex((p) => p.id === id); //busca el producto por id
    products[index] = { //actualiza el producto
        ...products[index], //extrae el producto
        ...productData, //extrae los datos del producto
    };

    await fs.promises.writeFile(pathFile, JSON.stringify(products)); //escribe el archivo
    const product = await getProductById(id); //busca el producto por id
    return product; //devuelve el producto
};

const deleteProduct = async (id) => { //elimina un producto
    await getProducts();   //lee el archivo
    const product = await getProductById(id); //busca el producto por id
    if (!product) return false; //si no existe el producto, devuelve false
    products = products.filter((p) => p.id !== id); //filtra el producto por id
    await fs.promises.writeFile(pathFile, JSON.stringify(products)); //escribe el archivo

    return true; //devuelve true
};

export default {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};  //exporta las funciones de productos