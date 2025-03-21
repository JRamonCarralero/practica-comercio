import React from "react";

/**
 * Renders a table displaying the products in the cart.
 *
 * @param {Object} props - The properties object.
 * @param {Array} props.products - An array of product objects in the cart.
 * @param {function} props.onEditProduct - Function to call when editing a product.
 * @param {function} props.onRemoveProduct - Function to call when removing a product from the cart.
 */
function ProductsForm({ products, onEditProduct, onRemoveProduct }) {
    return (
        <table className="products-table" id="products-table">
            <thead>
                <tr className="table-header-row">
                    <th className="th">Nombre</th>
                    <th className="th">Precio</th>
                    <th className="th-btn"></th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr className="table-row" key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.price} €</td>
                        <td className="td-btn">
                            <button className="table-btn" onClick={() => onEditProduct(product)}>✎</button>
                            <button className="table-btn" onClick={() => onRemoveProduct(product._id)}>🗑</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ProductsForm;