import React, { useEffect, useState } from "react";
import { getAPIData } from "../utils/utils";
import { useUserContext } from "../context/UserProvider";
import TicketForm from "./TicketForm";
import TicketList from "./TicketList";
import "../css/Ticket.css";

function Ticket() {

    const dbProducts = async () => {
        const productsDB = await getAPIData('http://localhost:3333/read/products', 'GET');
        return productsDB;
    }

    const [ticketLine, setTicketLine] = useState({
        product: {},
        qty: 1
    });
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');

    const { contextUser } = useUserContext();

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

    const getProduct = (id) => {
        const product = products.find(product => product._id === id);
        return product;
    }

    const findSelectedProduct = (id) => {
        const index = selectedProducts.findIndex(product => product.productId === id);
        return index;
    }

    const addTicketLine = () => {
        const product = getProduct(ticketLine.product);
        if (findSelectedProduct(product._id) !== -1) {
            alert('El producto ya fue seleccionado');
            return;
        }
        const data = { 
            productId: product._id,
            productName: product.name,
            productPrice: product.price,
            qty: ticketLine.qty
         };
         console.log(data);
        setSelectedProducts([...selectedProducts, data]);
        createDate();
        setTicketLine({product: {}, qty: 1});
    };

    const removeSelectedProduct = (ticket) => {
        setSelectedProducts(selectedProducts.filter(product => product !== ticket));
    }

    const createTicket = async () => {
        const newTicket = {
            userId: contextUser._id,
            userName: contextUser.name,
            date: fecha,
            hour: hora,
            products: selectedProducts
        }

        const ticket = await getAPIData('http://localhost:3333/create/ticket', 'POST', JSON.stringify(newTicket));
        console.log(ticket);

        setSelectedProducts([]);
        createDate();
    }

    useEffect(() => {
        createDate();
        dbProducts().then(data => { setProducts(data) })
    }, []);

    return (
        <div className="ticket-container">
            <h2 className="ticket-title">Ticket</h2>
            <p className="ticket-text">Le atiende <strong>{contextUser.name}</strong></p>
            <p className="ticket-text">Fecha: {fecha} {hora}</p>
            <TicketForm products={products} ticketLine={ticketLine} onSetTicketLine={setTicketLine} onAddTicketLine={addTicketLine} />
            <TicketList selectedProducts={selectedProducts} onRemoveTicket={removeSelectedProduct} />
            {(selectedProducts.length !== 0) &&
                <div className="ticket-buttons">
                    <button className="ticket-btn" onClick={() => setSelectedProducts([])}>Borrar</button>
                    <button className="ticket-btn" onClick={createTicket}>Guardar</button>
                </div>
            }
        </div>
    );
}

export default Ticket;