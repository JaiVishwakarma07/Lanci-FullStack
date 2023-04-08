import React, { useEffect, useState } from "react";
import "./navbar.scss"
import { Link, useLocation, useNavigate } from "react-router-dom"
import newRequest from "../../utils/newRequest";

const Navbar = () => {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation()
    const navigate = useNavigate();

    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false);
    }

    useEffect(() => {
        window.addEventListener("scroll", isActive);
        return () => {
            window.removeEventListener("scroll", isActive)
        }
    }, [])

    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    // console.log(currentUser._id)

    const handleLogout = async () => {
        try {
            await newRequest.post("/auth/logout")
            localStorage.setItem("currentUser", null)
            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }
    // console.log(currentUser)

    return (
        <div className={active || pathname !== "/" ? "Navbar active" : "Navbar"}>
            <div className="container">
                <div className="logo">
                    <Link to="/" className="link">
                        <span className="text">Lanci</span>
                    </Link>
                    <span className="dot">.</span>
                </div>
                <div className="links">
                    <span>Lanci Bussiness</span>
                    <span>Explore</span>
                    <span>English</span>
                    {!currentUser && <Link className="link" to="/login">Sign In</Link>}
                    {!currentUser?.isSeller && <span>Become a seller</span>}
                    {!currentUser && <Link className="link" to="/register">
                        <button>Join</button>
                    </Link>}
                    {currentUser &&
                        <div className="user" onClick={() => setOpen(!open)}>
                            <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
                            <span>{currentUser?.username}</span>
                            {open && <div className="options">
                                {
                                    currentUser?.isSeller && (
                                        <>
                                            <Link className="link" to="/mygigs">Gigs</Link>
                                            <Link className="link" to="/add">Add New Gig</Link>
                                        </>
                                    )
                                }
                                <Link className="link" to="/orders">Orders</Link>
                                <Link className="link" to="/messages">Messages</Link>
                                <Link className="link" onClick={handleLogout}>Logout</Link>
                            </div>}
                        </div>
                    }
                </div>
            </div>
            {(active || pathname !== "/") && <> <hr />
                <div className="menu">
                    <Link className="link" to="/">Graphics & Design</Link>
                    <Link className="link" to="/">Video & Animation</Link>
                    <Link className="link" to="/">Writing & Translation</Link>
                    <Link className="link" to="/">AI Services</Link>
                    <Link className="link" to="/">Digital Marketing</Link>
                    <Link className="link" to="/">Music & Audio</Link>
                    <Link className="link" to="/">Programming & Tech</Link>
                    <Link className="link" to="/">Bussiness</Link>
                    <Link className="link" to="/">Lifestyle</Link>
                </div>
                <hr />
            </>}
        </div>
    )
}
export default Navbar