import fs from "fs";

let carts = []; //array de carritos
const pathFile = "./src/data/carts.json"; //ruta del archivo

const getCarts = async () => {
    const cartsJson = await fs.promises.readFile(pathFile, "utf-8"); //lee el archivo
    const cartsPars = JSON.parse(cartsJson); //parsea el archivo
    carts = cartsPars || []; //si no hay carritos, crea un array vacio
};

const createCart = async () => { //crea un carrito
    await getCarts(); //lee el archivo
    const newCart = { //crea el carrito
        id: carts.length + 1, //id del carrito
        products: [], //array de productos
    };

    carts.push(newCart); //agrega el carrito al array de carritos

    await fs.promises.writeFile(pathFile, JSON.stringify(carts)); //escribe el archivo
    return newCart; //devuelve el carrito creado
};

const getCartById = async (cid) => { // busca un carrito por id

    await getCarts(); //lee el archivo
    const cart = carts.find((c) => c.id === cid); //busca el carrito por id
    return cart; //devuelve el carrito
};

const addProductToCart = async (cid, pid) => { //agrega un producto a un carrito
    await getCarts(); //lee el archivo
    const product = { //crea el producto
        product: pid, //id del producto
        quantity: 1, //cantidad
    };

    const index = carts.findIndex((cart) => cart.id === cid); //busca el carrito por id
    carts[index].products.push(product); // agrega el producto al carrito


    await fs.promises.writeFile(pathFile, JSON.stringify(carts)); //escribe el archivo

    return carts[index]; //devuelve el carrito
};

export default { //exporta las funciones
    getCarts,
    getCartById,
    addProductToCart,
    createCart,
};