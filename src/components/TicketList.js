import React from "react";

/**
 * Renders a table displaying the tickets in the cart.
 *
 * @param {Object} props - The properties object.
 * @param {Array} props.selectedProducts - An array of ticket objects in the cart.
 * @param {function} props.onRemoveTicket - Function to call when removing a ticket from the cart.
 */
function TicketList(props) {
    return (
        <table className="ticket-table">
            <thead>
                <tr className="table-header-row">
                    <th className="th">Producto</th>
                    <th className="th">Cantidad</th>
                    <th className="th">Precio</th>
                    <th className="th">Total</th>
                    <th className="th-btn"></th>
                </tr>
            </thead>
            <tbody>
                {props.selectedProducts.map((ticket) => (
                    <tr className="table-row" key={ticket.productId}>
                        <td>{ticket.productName}</td>
                        <td>{ticket.qty}</td>
                        <td>{ticket.productPrice} €</td>
                        <td>{ticket.qty * ticket.productPrice} €</td>
                        <td className="td-btn">
                            <button className="table-btn" onClick={() => props.onRemoveTicket(ticket)}>🗑</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3} className="td-total">Total:</td>
                    <td className="td-total-price">{props.selectedProducts.reduce((total, ticket) => total + ticket.qty * ticket.productPrice, 0)} €</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    );
}

export default TicketList;