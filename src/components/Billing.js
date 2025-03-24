import React, { useState } from "react";
import BillingForm from "./BillingForm";
import BillingList from "./BillingList";
import { getAPIData } from "../utils/utils";
import "../css/Billing.css";

function Billing() {

    const [tickets, setTickets] = useState([]);
    const [selTicket, setSelTicket] = useState({});

    const applyFilter = async (filter) => {
        const data = await getAPIData('http://localhost:3333/filter/ticket', 'POST', JSON.stringify(filter));
        setTickets(data);
    };

    return (
        <div className="billing-container">
            <h2>Facturación</h2>
            <BillingForm applyFilter={applyFilter}/>
            <BillingList tickets={tickets} onSetSelTicket={setSelTicket}/>
        </div>
    );
}

export default Billing;