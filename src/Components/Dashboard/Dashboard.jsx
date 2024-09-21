import React, { useEffect, useState } from "react";
import {
  FiHome,
  FiDollarSign,
  FiRepeat,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import { FaHistory } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
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
import "./dashboard.css";

const Dashboard = () => {
  const dfultImg =
    "https://img.freepik.com/premium-photo/man-wearing-glasses-purple-pink-background-with-picture-man-wearing-glasses_1103290-66109.jpg";
  let time = new Date().toLocaleTimeString();
  const date = new Date().toLocaleDateString();
  const [userName, setUserName] = useState("");
  const [transatioGraph, setTransatioGraph] = useState("");
  const [userId, setUserId] = useState("");
  const [userIncome, setUserIncome] = useState(0);
  const [userExpens, setUserExpenses] = useState(0);
  const [userAmount, setUserAmount] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [Time, setTime] = useState(time);

  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };
  setInterval(updateTime, 1000);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("curentUser"));
    if (user) {
      setUserName(user.userName);
      setUserEmail(user.email);
      setUserId(user._id);
      setUserProfile(`http://localhost:3001/${user.image}`);
      fetchAmount();
      fetchIncomeExpenses();
    } else {
      window.location.href = "/login";
    }
  }, [userId]);

  const fetchAmount = async () => {
    try {
      const response = await fetch(`http://localhost:3001/totalamount`);
      const data = await response.json();
      if (data.totalAmount.userId === userId) {
        setUserAmount(data.totalAmount.totalAmount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchIncomeExpenses = async () => {
    try {
      const response = await fetch(`http://localhost:3001/transactions`);
      const data = await response.json();
      const filteredData = data.data.filter((item) => item.userId === userId);
      setTransatioGraph(filteredData);
      let totalIncome = 0;
      let totalExpenses = 0;

      filteredData.forEach((item) => {
        if (item.transactionType === "income") {
          totalIncome += item.amount;
        } else {
          totalExpenses += item.amount;
        }
      });

      setUserIncome(totalIncome);
      setUserExpenses(totalExpenses);

      const total_Amount = totalIncome - totalExpenses;
      const updatedAmount = total_Amount + userAmount;

      const fetching = await fetch(
        `http://localhost:3001/totalamount/update/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ totalAmount: updatedAmount }),
        }
      );
      const fetchJson = await fetching.json();
      setUserAmount(fetchJson.updatedAmount.totalAmount);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <div className="dashboard">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="sidebarHeader">
          <h2>Finance Tracker</h2>
        </div>
        <nav className="sidebarNav">
          <a className="sidebarItem">
            <FiHome className="sidebarIcon" />
            Dashboard
          </a>

          <a href="/totalamount" className="sidebarItem">
            <FiDollarSign className="sidebarIcon" />
            Add Amount
          </a>
          <a href="/amount" className="sidebarItem">
            <FaHistory className="sidebarIcon" />
            History
          </a>
          <a href="/transaction" className="sidebarItem">
            <FiRepeat className="sidebarIcon" />
            Transaction
          </a>
          <a href="/graphs" className="sidebarItem">
            <GoGraph className="sidebarIcon" />
            Income vs Expenses
          </a>
          <a href="/updateprofile" className="sidebarItem">
            <FiUser className="sidebarIcon" />
            Profile
          </a>

          <a href="/login" className="sidebarItem">
            <FiLogOut className="sidebarIcon" />
            Logout
          </a>
          <a href="/login" className="sidebarItem">
            <CiCalendarDate className="sidebarIcon" />
            {/* {`${month + 1}-${day}-${year}`} */}
            {date}
          </a>
          <a href="/login" className="sidebarItem">
            <MdAccessTime className="sidebarIcon" />
            {Time}
          </a>
        </nav>
      </div>

      <div className="mainContent">
        {/* Navbar */}
        <header className="navbar">
          <div className="navbarTitle">{userName}</div>
          <div className="profileContainer">
            <img
              src={userProfile ? userProfile : dfultImg}
              alt="Profile"
              className="profilePic"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            />
            {showProfileMenu && (
              <div className="profileMenu">
                <p className="profileEmail">{userEmail}</p>
                <a href="/updateprofile" className="profileLink">
                  Update Profile
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="dashboardContent">
          <div className="container">
            <div className="statsGrid">
              {/* Total Amount */}
              <div className="statCard">
                <h3 className="statTitle">Total Amount</h3>
                <p className="statValue">$ {userAmount}</p>
              </div>

              {/* Income Amount */}
              <div className="statCard">
                <h3 className="statTitle">Income</h3>
                <p className={`$statValue} $incomeValue}`}>$ {userIncome}</p>
              </div>

              {/* Expense Amount */}
              <div className="statCard">
                <h3 className="statTitle">Expenses</h3>
                <p className={`$statValue} $expenseValue}`}>$ {userExpens}</p>
              </div>

              {/* Monthly Goals */}
              <div className="statCard">
                <h3 className="statTitle">Monthly Goals</h3>
                <p className={`$statValue} $goalValue}`}>75%</p>
              </div>
            </div>

            {/* Chart */}
            <div className="chartContainer">
              <h3 className="chartTitle">Income </h3>
              <div className="chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={transatioGraph}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis dataKey="amount" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke="#10B981" />
                    {/* <Line type="monotone" dataKey="amount" stroke="#EF4444" /> */}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
