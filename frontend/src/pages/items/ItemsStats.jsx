import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function ItemStats({ loans }) {
    const currentYear = new Date().getFullYear();

    const loansPerMonth = Array(12).fill(0);
    loans
        .filter(loan => new Date(loan.start_date).getFullYear() === currentYear)
        .forEach(loan => {
            const start = new Date(loan.start_date);
            loansPerMonth[start.getMonth()]++;
        });

    const data = loansPerMonth.map((value, idx) => ({
        name: new Date(0, idx).toLocaleString('default', { month: 'short' }),
        total: value,
    }));

    return (
        <div className="p-6">
            <h2 className="text-2xl mb-4">LoansHistory per month - {currentYear}</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#8884d8" name="Loans" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ItemStats;
