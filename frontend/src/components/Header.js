import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className="d-flex justify-content-center">
            <Link to="/"
                style={{
                    fontFamily: "monospace",
                    fontSize: "2.3rem",
                    textDecoration: "none",
                    color: "black"
                }}
                className="">
                HEALTH PROFILE
            </Link>
        </div>
    );
}

export default Header
