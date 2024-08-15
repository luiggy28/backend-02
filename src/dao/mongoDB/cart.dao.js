
import { cartModel } from "./models/cart.model.js";
import { productModel } from "./models/product.model.js";

const getAll = async () => {
    const carts = await cartModel.find();
    return carts;
};

const getById = async (id) => {
    const cart = await cartModel.findById(id).populate("products.product");
    return cart;
};

const create = async () => {
    const cart = await cartModel.create({});
    return cart;
};

const update = async (id, data) => {
    const cartUpdate = await cartModel.findByIdAndUpdate(id, data, { new: true });
    return cartUpdate;
};

const deleteOne = async (id) => {
    const cart = await cartModel.deleteOne({ _id: id });
    return cart;
};

const addProductToCart = async (cid, pid) => {
    // Buscar el producto por su ID
    const product = await productModel.findById(pid);
    if (!product) return { product: false };

    // Buscar el carrito por su ID
    const cart = await cartModel.findById(cid);
    if (!cart) return { cart: false };

    // Intentar actualizar la cantidad del producto en el carrito
    const productInCart = await cartModel.findOneAndUpdate(
        { _id: cid, "products.product": pid },
        { $inc: { "products.$.quantity": 1 } },
        { new: true }
    );

    // Si el producto no está en el carrito, agregarlo
    if (!productInCart) {
        await cartModel.updateOne(
            { _id: cid },
            { $push: { products: { product: pid, quantity: 1 } } }
        );
    }

    // Devolver el carrito actualizado
    const cartUpdate = await cartModel.findById(cid);
    return cartUpdate;
};

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne,
    addProductToCart
}