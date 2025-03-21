import React from "react";

/**
 * TicketForm component renders a form for adding a new ticket line.
 * It includes a select for choosing the product and an input field for the quantity.
 * The form submission is handled by the handleSubmit function, which prevents
 * the default behavior and triggers the onAddTicketLine function passed via props.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Object} props.ticketLine - The ticket line object with product and quantity
 * @param {Function} props.onSetTicketLine - Function to call when any of the form values change
 * @param {Function} props.onAddTicketLine - Function to call when the form is submitted
 * @param {Array} props.products - The list of products to populate the select
 */
function TicketForm(props) {

    /**
     * Handles the form submission event.
     * Prevents the default form submission behavior and calls the
     * onAddTicketLine function passed via props to add a ticket line.
     *
     * @param {Event} e - The form submission event
     */
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