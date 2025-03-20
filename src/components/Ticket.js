import React, { useEffect, useState } from "react";
import { getAPIData } from "../utils/utils";
import { useUserContext } from "../context/UserProvider";
import TicketForm from "./TicketForm";
import "../css/Ticket.css";

function Ticket() {

    const dbProducts = async () => {
        const productsDB = await getAPIData('http://localhost:3333/read/products', 'GET');
        return productsDB;
    }

    const createDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const fecha = `${year}-${month}-${day}`;
        const hora = `${hours}:${minutes}`;
        setFecha(fecha);
        setHora(hora);
    };

    //const [product, setProduct] = useState({});
    const [ticketLine, setTicketLine] = useState({
        product: "",
        qty: 1
    });
    const [products, setProducts] = useState([]);
    //const [selectedProducts, setSelectedProducts] = useState([]);
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');

    const { contextUser } = useUserContext();

    const addTicketLine = () => {
        const data = { ...ticketLine,
            user: contextUser._id,
            date: fecha,
            time: hora
         };
        console.log(data);
    };

    useEffect(() => {
        createDate();
        dbProducts().then(data => { setProducts(data) })
    }, []);

    return (
        <div className="ticket-container">
            <h2 className="ticket-title">Ticket</h2>
            <p className="ticket-user">Le atiende {contextUser.name}</p>
            <p>Fecha: {fecha} {hora}</p>
            <TicketForm products={products} ticketLine={ticketLine} onSetTicketLine={setTicketLine} onAddTicketLine={addTicketLine} />
        </div>
    );
}

export default Ticket;