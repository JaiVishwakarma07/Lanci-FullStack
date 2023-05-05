import "./pay.scss"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react";
import newRequest from "../../utils/newRequest"
import { useParams } from "react-router-dom"
import CheckoutForm from "../../components/checkoutForm/CheckoutForm"

const stripePromise = loadStripe("pk_test_51Mu6oKSHR8fecd8dYKp2bjai7HHOMB0eIoePub4p6xzwmwkYtEeREjPvBG27pdk6TIDR4y8WxUfuEFEhWFGhOlV700CTuj4bvz");

const Pay = () => {
    const [clientSecret, setClientSecret] = useState("");
    const { id } = useParams()
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await newRequest.post(`/orders/create-payment-intent/${id}`)
                setClientSecret(res.data.clientSecret)
            } catch (error) {
                console.log(error)
            }
        }
        makeRequest()
    }, [])

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="pay">
            <div className="container">
                <h1>Payment</h1>
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
            </div>
        </div>
    )
}

export default Pay