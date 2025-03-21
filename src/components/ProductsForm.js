import React from "react";
import "../css/Products.css";

/**
 * ProductsForm component renders a form for adding a new product.
 * It includes input fields for the product details such as name, price, and description.
 * The form submission is handled by the handleSubmit function, which prevents
 * the default behavior and calls the onAddProduct function passed via props to add a product.
 *
 * @param {Object} props - The component props
 * @param {Object} props.product - The product object with _id, name, price, and description
 * @param {Function} props.onSetProduct - Function to call when any of the form values change
 * @param {Function} props.onAddProduct - Function to call when the form is submitted
 * @returns {JSX.Element} The rendered form component
 */
function ProductsForm({ product, onSetProduct, onAddProduct }) {

    /**
     * Handles the form submission event.
     * Prevents the default form submission behavior and calls the
     * onAddProduct function passed via props to add a product.
     *
     * @param {Event} e - The form submission event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        onAddProduct();
    };

    return (
        <form className="products-form" onSubmit={handleSubmit}>
            <input
                type="hidden"
                value={product._id}
                onChange={(e) => onSetProduct({...product, _id: e.target.value})}
            />
            <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={product.name}
                    onChange={(e) => onSetProduct({...product, name: e.target.value})}
                />
            </div>
            <div className="form-group">
                <label htmlFor="price">Precio</label>
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={(e) => onSetProduct({...product, price: Number(e.target.value)})}
                />
            </div>
            <div className="form-textarea">
                <label htmlFor="description">Descripci&oacute;n</label>
                <textarea
                    placeholder="Description"
                    value={product.description}
                    onChange={(e) => onSetProduct({...product, description: e.target.value})}
                    rows="4"
                />
            </div>
            <button type="submit" className="submit-btn" >Guardar</button>
        </form>
    );
}

export default ProductsForm;