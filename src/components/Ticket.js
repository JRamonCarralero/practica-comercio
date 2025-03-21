import React, { useEffect, useState } from "react";
import { getAPIData } from "../utils/utils";
import { useUserContext } from "../context/UserProvider";
import TicketForm from "./TicketForm";
import TicketList from "./TicketList";
import "../css/Ticket.css";

/**
 * This component renders the ticket page.
 * 
 * @returns {JSX.Element}
 */
function Ticket() {

    /**
     * Retrieves the products from the database.
     * 
     * @async
     * @returns {Promise<Object[]>} - An array of product objects.
     */
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

    /**
     * Sets the current date and time in 'fecha' and 'hora' state variables.
     * The date is formatted as 'YYYY-MM-DD' and time as 'HH:MM'.
     */
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

    /**
     * Retrieves a product from the products list by its ID.
     *
     * @param {string} id - The ID of the product to retrieve.
     * @returns {Object|undefined} - The product object if found, otherwise undefined.
     */
    const getProduct = (id) => {
        const product = products.find(product => product._id === id);
        return product;
    }

    /**
     * Finds the index of a product in the selectedProducts list by its product ID.
     *
     * @param {string} id - The ID of the product to find in the selectedProducts list.
     * @returns {number} - The index of the product in the selectedProducts list if found, otherwise -1.
     */
    const findSelectedProduct = (id) => {
        const index = selectedProducts.findIndex(product => product.productId === id);
        return index;
    }

    /**
     * Adds a new product to the selectedProducts list, if it doesn't exist yet.
     * It will also reset the ticketLine state to empty product and qty of 1.
     * If the product is already in the list, it will alert the user and do nothing.
     */
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

    /**
     * Removes a product from the selectedProducts list.
     * @param {Object} ticket - The ticket object to remove from the selectedProducts list.
     */
    const removeSelectedProduct = (ticket) => {
        setSelectedProducts(selectedProducts.filter(product => product !== ticket));
    }

    /**
     * Creates a new ticket in the database.
     * It will take the products in the selectedProducts list and add them to the new ticket.
     * It will also clean the selectedProducts list and create a new date and hour.
     */
    const createTicket = async () => {
        const newTicket = {
            userId: contextUser._id,
            userName: contextUser.name,
            date: fecha,
            hour: hora,
            products: selectedProducts,
            total: selectedProducts.reduce((total, product) => total + product.productPrice * product.qty, 0)
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