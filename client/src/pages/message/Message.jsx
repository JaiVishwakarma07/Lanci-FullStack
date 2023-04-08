import React from "react";
import "./message.scss"
import { Link, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Message = () => {
    const { id } = useParams();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const queryClient = useQueryClient();
    const { isLoading, error, data } = useQuery({
        queryKey: ["messages"],
        queryFn: () => newRequest.get(`/messages/${id}`).then((res) => {
            return res.data
        })
    })

    const mutation = useMutation({
        mutationFn: (message) => {
            return newRequest.post(`/messages`, message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["messages"])
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        mutation.mutate({
            conversationId: id,
            desc: e.target[0].value,
        });
        e.target[0].value = ""
    }

    return (
        <div className="Message">
            <div className="container">
                <span className="breadcrumbs">
                    <Link className="link" to="/messages">MESSAGES</Link> > JAI >
                </span>
                {isLoading ? "loading..." : error ? "Can't load messages" :
                    <div className="messages">
                        {data.map((m) => (
                            <div className={currentUser._id === m.userId ? "owner item" : "item"} key={m.id}>
                                <img src="https://pixlr.com/images/index/remove-bg.webp" alt="" />
                                <p>
                                    {m.desc}
                                </p>
                            </div>
                        ))}

                    </div>}
                <hr />
                <form className="write" onSubmit={handleSubmit}>
                    <textarea name="" placeholder="write a message" id="" cols="30" rows="10"></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}
export default Message