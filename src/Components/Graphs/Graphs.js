import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./graphs.css";

const Graphs = () => {
  const [incomeGraph, setIncomeGraph] = useState("");
  const [expensesGraph, setExpensesGraph] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getUser();
    fetchTransactions();
  }, [userId]);

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem("curentUser"));
    setUserId(user._id);
  };

  const fetchTransactions = async () => {
    const response = await fetch("http://localhost:3001/transactions");
    const data = await response.json();
    console.log(data);
    const transactions = data.data.filter((item) => item.userId === userId);
    let incomeTransacton = [];
    let espensesTransacton = [];

    transactions.forEach((transaction) => {
      if (transaction.transactionType === "income") {
        incomeTransacton.push(transaction);
      } else {
        espensesTransacton.push(transaction);
      }
    });
    setIncomeGraph(incomeTransacton);
    setExpensesGraph(espensesTransacton);
    console.log(transactions);
  };

  return (
    <div className="financial-graphs">
      <h1>Financial Overview</h1>
      <div className="graph-container">
        <div className="graph">
          <h2>Income Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={incomeGraph}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#10B981"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="graph">
          <h2>Expense Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={expensesGraph}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#EF4444"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <button className="backHome">
          <a href="/dashboard">Back to Home</a>
        </button>
      </div>
    </div>
  );
};

export default Graphs;
