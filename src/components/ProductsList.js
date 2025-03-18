import React from "react";

function ProductsForm({ products, onEditProduct, onRemoveProduct }) {
    return (
        <table className="product-table" id="product-table">
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
                        <td>{product.price}</td>
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