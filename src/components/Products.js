import React, { useEffect, useState } from "react";
import { getAPIData } from "../utils/utils";
import ProductsForm from "./ProductsForm";
import ProductsList from "./ProductsList";
import "../css/Products.css";

/**
 * The Products component renders a page for managing products.
 * It fetches the list of products from the database and renders a form for adding or updating products.
 * The component also renders a table with the list of products, each row having options to edit or remove the product.
 * @component
 * @example
 * <Products />
 */
function Products() {

    /**
     * Retrieves the products from the database.
     * 
     * @async
     * @returns {Promise<Object[]>} - An array of product objects.
     */
    const dbProducts = async () => {
        const productsDB = await getAPIData('http://localhost:3333/read/products', 'GET');
        return productsDB;
    };

    const [product, setProduct] = useState({
        _id: "",
        name: "",
        price: "",
        description: ""
    });
    const [products, setProducts] = useState([]);

    /**
     * Adds a new product to the database or updates an existing one.
     * If the product state has an _id, it calls updateProduct, otherwise it calls createProduct.
     * @function
     * @async
     * @returns {Promise<void>}
     */
    const addProduct = () => {
        if (product._id) {
            updateProduct();
        } else {
            createProduct();
        }
    };

    /**
     * Creates a new product in the database with the data in the product state.
     * When the product is created, the products list is updated and the product state is cleared.
     * @function
     * @async
     * @returns {Promise<void>}
     */
    const createProduct = async () => {
        const prod = {...product};
        delete prod._id;
        const newProduct = await getAPIData('http://localhost:3333/create/product', 'POST', JSON.stringify(prod));
        setProducts([newProduct, ...products]);
        clearProduct();
    };

    /**
     * Updates a product in the database with the data in the product state.
     * It will also update the products list and clear the product state.
     * @function
     * @async
     * @returns {Promise<void>}
     */
    const updateProduct = async () => {
        const prod = {...product};
        delete prod._id;
        await getAPIData(`http://localhost:3333/update/product/${product._id}`, 'PUT', JSON.stringify(prod));
        setProducts(products.map(p => p._id === product._id ? product : p));
        clearProduct();
    };

    /**
     * Removes a product from the database and the products list.
     * @function
     * @async
     * @param {string} id - The ID of the product to be removed.
     * @returns {Promise<void>}
     */
    const removeProduct = async (id) => {
        await getAPIData(`http://localhost:3333/delete/product/${id}`, 'DELETE');
        setProducts(products.filter(product => product._id !== id));
    };

    /**
     * Resets the product state to its initial values.
     * This function is called whenever a product is added or updated.
     * @function
     */
    const clearProduct = () => {
        setProduct({
            _id: "",
            name: "",
            price: "",
            description: ""
        });
    };

    /**
     * Sets the product state to the specified product.
     * @param {Object} product - The product object to set in the state.
     */
    const editProduct = (product) => {
        setProduct(product);
    };

    useEffect(() => {
        dbProducts().then(data => setProducts(data));
    }, []);

    return (
        <div className="products-container">
            <h2 className="products-title">Products</h2>
            <ProductsForm product={product} onSetProduct={setProduct} onAddProduct={addProduct} />
            <ProductsList products={products} onEditProduct={editProduct} onRemoveProduct={removeProduct} />
        </div>
    );
}

export default Products;