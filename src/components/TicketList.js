import React from "react";

function TicketList(props) {
    return (
        <table className="ticket-table">
            <thead>
                <tr>
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
        </table>
    );
}

export default TicketList;