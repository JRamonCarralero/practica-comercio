import React, { useEffect, useState } from "react";
import { getAPIData } from "../utils/utils";
import { useUserContext } from "../context/UserProvider";
import TicketForm from "./TicketForm";
import "./Ticket.css";

function Ticket() {

    const dbProducts = async () => {
        const productsDB = await getAPIData('http://localhost:3333/read/products', 'GET');
        return productsDB;
    }

    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');

    const { contextUser } = useUserContext();

    useEffect(() => {
        const date = new Date();
        setFecha(`${date.getFullYear}-${date.getMonth}-${date.getDate}`);
        setHora(`${date.getHours}:${date.getMinutes}`);


        dbProducts().then(data => { setProducts(data) })
    }, []);

    return (
        <div className="ticket-container">
            <h2 className="ticket-title">Ticket</h2>
            <p className="ticket-user">Le atiende {contextUser.name}</p>
            <p>Fecha: {fecha} {hora}</p>
            <TicketForm products={products} setSelectedProducts={setSelectedProducts} />
        </div>
    );
}

export default Ticket;