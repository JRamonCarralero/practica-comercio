import React from "react";

function TicketForm(props) {

    

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onAddTicketLine();
    };

    return (
        <form className="ticket-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="product">Producto</label>
                <select 
                    name="product"
                    value={props.ticketLine.product}
                    onChange={(e) => props.onSetTicketLine({product: e.target.value, qty: 1})}
                >
                    <option value="">Select a product</option>
                    {props.products.map((product) => (
                        <option key={product._id} value={product._id}>{product.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="qty">Cantidad</label>
                <input
                    type="number"
                    name="qty"
                    placeholder="Cantidad"
                    value={props.ticketLine.qty}
                    onChange={(e) => props.onSetTicketLine({...props.ticketLine, qty: Number(e.target.value)})}
                />
            </div>
            <button className="submit-btn" type="submit">Añadir</button>
        </form>
    );
}

export default TicketForm;