import React from "react";

function BillingList({ tickets, onSetSelTicket }) {

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
                    <tr className="table-row" key={ticket._id}>
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