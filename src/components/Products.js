import React, { useEffect, useState } from "react";
import { getAPIData } from "../utils/utils";
import ProductsForm from "./ProductsForm";
import ProductsList from "./ProductsList";
//import "../css/Products.css";

function Products() {

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

    const addProduct = () => {
        if (product._id) {
            updateProduct();
        } else {
            createProduct();
        }
    };

    const createProduct = async () => {
        const newProduct = await getAPIData('http://localhost:3333/create/product', 'POST', JSON.stringify(product));
        setProducts([newProduct, ...products]);
        clearProduct();
    };

    const updateProduct = async () => {
        await getAPIData(`http://localhost:3333/update/product/${product._id}`, 'PUT', JSON.stringify(product));
        setProducts(products.map(p => p._id === product._id ? product : p));
        clearProduct();
    };

    const removeProduct = async (id) => {
        await getAPIData(`http://localhost:3333/delete/product/${id}`, 'DELETE');
        setProducts(products.filter(product => product._id !== id));
    };

    const clearProduct = () => {
        setProduct({
            _id: "",
            name: "",
            price: "",
            description: ""
        });
    };

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