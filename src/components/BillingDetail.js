import React from "react";

/**
 * Displays detailed information for a selected billing ticket.
 * 
 * This component renders a detailed view of a selected ticket, including 
 * the employee's name, date, time, and a list of products associated with
 * the ticket. Each product is displayed with its name, quantity, price, 
 * and total cost. The component also allows closing the detail view, 
 * resetting the selected ticket to null.
 * 
 * @param {Object} props - The component properties.
 * @param {Object} props.selectedTicket - The selected ticket object with details to display.
 * @param {Function} props.onSetSelectedTicket - Function to call to reset the selected ticket.
 */
function BillingDetail({ selectedTicket, onSetSelectedTicket }) {
    return (
        <div className="billing-detail-container">
            <div className="billing-close-container">
                <button className="billing-close" onClick={() => { onSetSelectedTicket(null) }}>X</button>
            </div>
            <div className="billing-detail-data">
                <p><strong>Empleado:</strong> {selectedTicket.userName}</p>
                <p><strong>Fecha:</strong> {selectedTicket.date} {selectedTicket.hour}</p>
            </div>
            <table className="billing-detail-table">
                <thead>
                    <tr className="table-header-row">
                        <th className="th">Producto</th>
                        <th className="th">Cantidad</th>
                        <th className="th">Precio</th>
                        <th className="th">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedTicket.products.map((ticket) => (
                        <tr className="table-row" key={ticket.productId}>
                            <td>{ticket.productName}</td>
                            <td>{ticket.qty}</td>
                            <td>{ticket.productPrice} €</td>
                            <td>{ticket.qty * ticket.productPrice} €</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3} className="td-total">Total:</td>
                        <td className="td-total-price">{selectedTicket.total} €</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default BillingDetail;