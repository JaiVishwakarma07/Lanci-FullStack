import React, { useState } from "react";
import "./login.scss"
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [username, setUsename] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await newRequest.post("/auth/login", { username, password }, { withCredentials: true })
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            navigate("/")
        } catch (err) {
            setError(err.respons.data)
        }
    }

    return (
        <div className="login">
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <h1>Sign IN</h1>
                    <label htmlFor="">Username</label>
                    <input type="text" name="username" placeholder="Username" onChange={e => setUsename(e.target.value)} />
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    <button type="submit" >Login</button>
                    {error && error}
                </form>
            </div>
        </div>
    )
}
export default Login