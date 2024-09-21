import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import NavBar from "../ReuseAble/Navabr/Navbar";
import {
  FaArrowRight,
  FaChartLine,
  FaWallet,
  FaPiggyBank,
} from "react-icons/fa";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="home-page">
      <NavBar />
      <div className="home-container">
        <motion.div
          className="sub-home-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="home-left-content">
            <motion.h2
              className="mainHeading"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              FINANCE
              <span className="subMainHeading">TRACKER</span>
            </motion.h2>
            <motion.p
              className="home-content"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Empower your finances, <br /> simplify your life.
            </motion.p>
            <motion.button
              className="getStartedBtn"
              onClick={() => navigate("/login")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Get Started <FaArrowRight className="arrow" />
            </motion.button>
          </div>
          <motion.div
            className="home-right-img"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <img
              className="homeImg"
              src="https://freepngimg.com/save/13301-finance-png-pic/423x298"
              alt="Finance"
            />
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="features-section"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <FeatureCard
          icon={<FaChartLine />}
          title="Track Expenses"
          description="Monitor your spending habits with ease"
        />
        <FeatureCard
          icon={<FaWallet />}
          title="Manage Budget"
          description="Set and stick to your financial goals"
        />
        <FeatureCard
          icon={<FaPiggyBank />}
          title="Save Money"
          description="Grow your savings with smart strategies"
        />
      </motion.div>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    className="feature-card"
    whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
  >
    <div className="feature-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </motion.div>
);

export default Home;
