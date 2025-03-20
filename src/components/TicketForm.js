import React, { useState } from "react";

function TicketForm(props) {

    const [ticketLine, setTicketLine] = useState({});

    return (
        <form className="ticket-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
                <label htmlFor="product">Ticket</label>
                <select 
                    name="product"
                    value={ticketLine.product}
                    onChange={(e) => setTicketLine({...ticketLine, product: e.target.value})}
                >
                    <option value="">Select a product</option>
                    {props.products.map((product) => (
                        <option key={product._id} value={product}>{product.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="qty">Description</label>
                <input
                    type="number"
                    name="qty"
                    placeholder="Cantidad"
                    value={ticketLine.qty}
                    onChange={(e) => setTicketLine({...ticketLine, qty: e.target.value})}
                />
            </div>
            <button className="submit-btn" type="submit">Añadir</button>
        </form>
    );
}

export default TicketForm;