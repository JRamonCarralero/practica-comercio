import React, { useState, useEffect } from "react";
import { getAPIData } from "../utils/utils";

function BillingForm() {
    const [employees, setEmployees] = useState([]);

    const dbEmployees = async () => {
        const employeesDB = await getAPIData('http://localhost:3333/read/users', 'GET');
        return employeesDB;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        console.log(data);
    };

    useEffect(() => {
        dbEmployees().then((employees) => {
            setEmployees(employees);
        });
    }, []);

    return (
        <form className="billing-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Empleado:</label>
                <select id="name" name="name">
                    <option value="">Todos</option>
                    {employees.map((employee) => (
                        <option key={employee._id} value={employee._id}>
                            {employee.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="from">Desde:</label>
                <input type="date" id="from" name="from" />
            </div>
            <div className="form-group">
                <label htmlFor="to">Hasta:</label>
                <input type="date" id="to" name="to" />
            </div>
            <button className="submit-btn" type="submit">Buscar</button>
        </form>
    );
}

export default BillingForm;