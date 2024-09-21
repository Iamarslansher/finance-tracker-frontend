import React, { useEffect, useState } from "react";
import "./history.css";

function History() {
  const [allTransaction, setAllTransaction] = useState("");

  useEffect(() => {
    fetchTransaction();
  }, []);

  const fetchTransaction = async () => {
    try {
      const response = await fetch("http://localhost:3001/transactions");
      const responseData = await response.json();
      console.log(responseData.data);
      setAllTransaction(responseData.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <div className="history-container">
      <div className="sideBar">SIDEBAR</div>
      <div className="righrContent">
        <h1>Transaction History</h1>
        <div className="transaction-list">
          {allTransaction &&
            allTransaction.map((transaction) => (
              <div className="historyDiv">
                <div className="transactionInfo">
                  <p>
                    <b>Transaction Type</b>:{transaction.transactionType}
                  </p>
                  <p>
                    <b>Description</b>: {transaction.description}
                  </p>
                  <p>
                    <b>Amount</b>:${transaction.amount}
                  </p>
                  <p>
                    <b>Date</b>: {transaction.month}
                  </p>
                </div>
                <button className="delete-button">Delete</button>
              </div>
            ))}
        </div>
      </div>
      {/* <div className="historyDiv">2</div>
          <div className="historyDiv">3</div>
          <div className="historyDiv">4</div> */}
    </div>
    // </div>
  );
}

export default History;
