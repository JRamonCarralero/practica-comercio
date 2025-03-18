import React from "react";

function ProductsForm({ product, onSetProduct, onAddProduct }) {

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
                    onChange={(e) => onSetProduct({...product, price: e.target.value})}
                />
            </div>
            <div className="form-textarea">
                <label htmlFor="description">Descripci&oacute;n</label>
                <textarea
                    placeholder="Description"
                    value={product.description}
                    onChange={(e) => onSetProduct({...product, description: e.target.value})}
                />
            </div>
            <button type="submit" className="submit-btn" >Guardar</button>
        </form>
    );
}

export default ProductsForm;