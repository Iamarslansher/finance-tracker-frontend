import React, { useState, useEffect } from "react";
import { FaDollarSign, FaEdit, FaSave } from "react-icons/fa";
import "./totalbudget.css";

const TotalBudget = () => {
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [budget, setBudget] = useState(0);
  const [newBudget, setNewBudget] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load budget from localStorage on component mount
    fetchBudegt();
  }, []);

  const fetchBudegt = async () => {
    try {
      const curentUser = JSON.parse(localStorage.getItem("curentUser"));
      if (!curentUser) {
        return (window.location.href = "/login");
      }
      setUser(curentUser);
      setUserId(curentUser._id);

      const response = await fetch("http://localhost:3001/totalAmount");
      const savedBudget = await response.json();
      if (savedBudget.totalAmount === null) {
        setBudget(0);
      } else {
        setBudget(savedBudget.totalAmount.totalAmount);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSaveBudget = async () => {
    try {
      if (newBudget && !isNaN(newBudget)) {
        console.log({
          userId,
          totalAmount: newBudget,
        });
        const response = await fetch(`http://localhost:3001/totalAmount/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ totalAmount: newBudget, userId }),
        });
        const data = await response.json();
        console.log(data);

        setIsEditing(false);
        setNewBudget("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="budget-manager">
      <h1 className="title">Budget Manager</h1>
      <div className="budget-display">
        <FaDollarSign className="dollar-icon" />
        <span className="budget-amount">{!budget ? 0.0 : budget}</span>
      </div>
      {isEditing ? (
        <div className="budget-form">
          <input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            placeholder="Enter new budget"
            className="budget-input"
          />
          <button onClick={handleSaveBudget} className="save-button">
            <FaSave /> Save
          </button>
        </div>
      ) : (
        <button onClick={() => setIsEditing(true)} className="edit-button">
          <FaEdit /> Update Budget
        </button>
      )}
    </div>
  );
};

export default TotalBudget;
