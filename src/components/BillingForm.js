import React, { useState, useEffect } from "react";
import { getAPIData } from "../utils/utils";

function BillingForm({ applyFilter }) {
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState("");
    const [from, setFrom] = useState(new Date().toISOString().split('T')[0]);
    const [to, setTo] = useState(new Date().toISOString().split('T')[0]);

    const dbEmployees = async () => {
        const employeesDB = await getAPIData('http://localhost:3333/read/users', 'GET');
        return employeesDB;
    };

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