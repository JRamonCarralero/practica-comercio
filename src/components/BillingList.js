import React from "react";

/**
 * BillingList component renders a table displaying a list of billing tickets.
 * Each ticket displays the employee's name, date, and total amount.
 * It also includes a button to view the details of each ticket.
 * The selected ticket is highlighted, and the total amount of all tickets is shown in the footer.
 *
 * @param {Array} tickets - The list of ticket objects to display.
 * @param {Function} onSetSelTicket - Function to call to set the selected ticket.
 * @param {Object} selTicket - The currently selected ticket object.
 */
function BillingList({ tickets, onSetSelTicket, selTicket }) {

    /**
     * Sets the selected ticket to the given ticket object.
     *
     * @param {Object} ticket - The ticket object to set as the selected ticket.
     */
    const showTicket = (ticket) => {
        onSetSelTicket(ticket);
    };

    return (
       <table className="billing-table">
            <thead>
                <tr className="table-header-row">
                    <th className="th">Empleado</th>
                    <th className="th">Fecha</th>
                    <th className="th">Total</th>
                    <th className="th-btn"></th>
                </tr>
            </thead>
            <tbody>
                {tickets.map((ticket) => (
                    <tr className={`table-row ${selTicket && ticket._id === selTicket._id ? "selected" : ""}`} key={ticket._id}>
                        <td>{ticket.userName}</td>
                        <td>{ticket.date}</td>
                        <td>{ticket.total} €</td>
                        <td className="td-btn">
                            <button className="table-btn" onClick={() => showTicket(ticket)}>👁</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={2} className="td-total">Total:</td>
                    <td className="total-price">{tickets.reduce((acc, ticket) => acc + ticket.total, 0)} €</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    );
}

export default BillingList;