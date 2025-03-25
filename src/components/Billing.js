import React, { useState } from "react";
import BillingForm from "./BillingForm";
import BillingList from "./BillingList";
import BillingDetail from "./BillingDetail";
import { getAPIData } from "../utils/utils";
import "../css/Billing.css";

/**
 * Billing component renders the billing page.
 * It includes a form for filtering tickets, a table with the filtered tickets and
 * a detail view for the selected ticket.
 *
 * @returns {JSX.Element}
 */
function Billing() {

    const [tickets, setTickets] = useState([]);
    const [selTicket, setSelTicket] = useState(null);

    /**
     * Applies a filter to the tickets list, by sending a POST request to /filter/ticket
     * with the filter object as JSON payload, and sets the tickets state with the
     * result of the request.
     *
     * @param {Object} filter - The filter object with the following properties:
     *                          userId: The user ID to filter by.
     *                          from: The start date to filter by.
     *                          to: The end date to filter by.
     */
    const applyFilter = async (filter) => {
        const data = await getAPIData('http://localhost:3333/filter/ticket', 'POST', JSON.stringify(filter));
        setTickets(data);
    };

    return (
        <div className="billing-container">
            <h2>Facturación</h2>
            <BillingForm applyFilter={applyFilter} />
            <BillingList tickets={tickets} onSetSelTicket={setSelTicket} selTicket={selTicket} />
            {selTicket && <BillingDetail selectedTicket={selTicket} onSetSelectedTicket={setSelTicket} />}
        </div>
    );
}

export default Billing;