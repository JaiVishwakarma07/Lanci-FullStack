import { useLocation, useNavigate } from "react-router-dom"
import newRequest from "../../utils/newRequest"
import { useEffect } from "react"

const Success = () => {
    const { search } = useLocation()
    const navigate = useNavigate()
    const params = new URLSearchParams(search)
    const payment_intent = params.get("payment_intent")

    useEffect(() => {
        const makerequest = async () => {
            try {
                await newRequest.put("/orders", { payment_intent })
                setTimeout(() => {
                    navigate("/orders")
                }, 5000)
            } catch (error) {
                console.log(error)
            }
        }
        makerequest()
    }, [])

    return (
        <div className="success">
            Payment Successfull. You are being redirected to orders page. Please do not close this page or reload browser
        </div>
    )
}
export default Success