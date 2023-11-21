import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/Navbar.css';

const Navbar = () => {

    const navigate = useNavigate();

    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <img src="/img/logo.png" alt="Logo" width="100%" onClick={() => navigate('/')} style={{cursor:"pointer"}}/>
                </div>
                <div className="navbar-container">
                    <div style={{ display: "flex", alignSelf: "center" }}>
                        <ul className="navbar-links">
                            <li className="navbar-link">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="navbar-link">
                                <Link to="/features">Features</Link>
                            </li>
                            <li className="navbar-link">
                                <Link to="/chatbot">ChatBot</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;