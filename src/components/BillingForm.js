import React, { useState, useEffect } from "react";
import { getAPIData } from "../utils/utils";

/**
 * BillingForm component renders a form for filtering tickets.
 * It includes a select for choosing the employee, two input fields for the
 * start and end dates, and a submit button.
 * The form submission is handled by the handleSubmit function, which prevents
 * the default form submission behavior, retrieves the form data, and calls the
 * applyFilter function passed via props with the form data.
 *
 * @param {Object} props - The component props
 * @param {Function} props.applyFilter - Function to call when the form is submitted
 * @returns {JSX.Element} The rendered form component
 */
function BillingForm({ applyFilter }) {
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState("");
    const [from, setFrom] = useState(new Date().toISOString().split('T')[0]);
    const [to, setTo] = useState(new Date().toISOString().split('T')[0]);

    /**
     * Fetches the list of employees from the database.
     * @async
     * @function
     * @returns {Promise<Array>} A promise that resolves to an array of employee objects.
     */
    const dbEmployees = async () => {
        const employeesDB = await getAPIData('http://localhost:3333/read/users', 'GET');
        return employeesDB;
    };

    /**
     * Handles the form submission event.
     * Prevents the default form submission behavior, retrieves the
     * form data, and calls the applyFilter function passed via props
     * with the form data.
     * 
     * @param {Event} e - The form submission event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        applyFilter(data);
    };

    useEffect(() => {
        dbEmployees().then((employees) => {
            setEmployees(employees);
        });
    }, []);

    return (
        <form className="billing-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="userId">Empleado:</label>
                <select id="userId" name="userId" value={employee} onChange={(e) => setEmployee(e.target.value)}>
                    <option key="all" value="">Todos</option>
                    {employees.map((emp) => (
                        <option key={emp._id} value={emp._id}>
                            {emp.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="from">Desde:</label>
                <input type="date" id="from" name="from" value={from} onChange={(e) => setFrom(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="to">Hasta:</label>
                <input type="date" id="to" name="to" value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
            <button className="submit-btn" type="submit">Buscar</button>
        </form>
    );
}

export default BillingForm;