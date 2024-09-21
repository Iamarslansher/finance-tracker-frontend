import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMoneyBillWave, FaArrowDown } from "react-icons/fa";
import { CiHome } from "react-icons/ci";
import "./transaction.css";

const Transaction = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [transactionType, setTransactionType] = useState("income");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("curentUser"));
    setUserId(user._id);
  }, []);

  const handleAddTransaction = async () => {
    if (description && amount && month) {
      const response = await fetch("http://localhost:3001/transactions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          amount,
          month,
          userId,
          transactionType,
        }),
      });
      const data = await response.json();
      setDescription("");
      setAmount("");
      setMonth("");
      alert(data.message);
    }
  };

  return (
    <div className="expense-tracker">
      <button className="back-button" onClick={() => navigate("/dashboard")}>
        <CiHome /> Back to Home
      </button>
      <h1 className="expense-tracker__title">Expense Tracker</h1>
      <div className="expense-tracker__form-container">
        <div className="form">
          <h2 className="form-title">
            <FaMoneyBillWave /> Transaction Form
          </h2>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter transaction description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <div className="form-group">
            <label htmlFor="month">Month</label>
            <input
              id="month"
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="transactionType">Transaction Type</label>
            <select
              id="transactionType"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <button className="add-button" onClick={handleAddTransaction}>
            <FaPlus /> Add Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
/**
  const response = await fetch("http://localhost:3001/transactions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          amount: parseFloat(amount),
          date,
          userId,
          transactionType,
        }),
 */
