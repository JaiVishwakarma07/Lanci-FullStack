import React, { useState } from "react";
import "./featured.scss"
import { useNavigate } from "react-router-dom"

const Featured = () => {
    const [input, setInput] = useState("")
    const navigate = useNavigate()
    const handleSubmit = () => {
        navigate(`gigs?search=${input}`);
    }
    return (
        <div className="featured">
            <div className="container">
                <div className="left">
                    <h1>Find Perfect <i>Freelance</i> Servies for your Bussiness</h1>
                    <div className="search">
                        <div className="searchInput">
                            <img src="./img/search.png" alt="" />
                            <input type="text" onChange={e => setInput(e.target.value)} name="" placeholder='Try "building mobile app"' />
                        </div>
                        <button onClick={handleSubmit}>Search</button>
                    </div>
                    <div className="popular">
                        <span>Popular:</span>
                        <button>Web Design</button>
                        <button>WordPress</button>
                        <button>Logo Design</button>
                        <button>AI Services</button>
                    </div>
                </div>
                <div className="right">
                    <img src="./img/man.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Featured