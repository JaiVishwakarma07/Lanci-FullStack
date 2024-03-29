import React from "react";
import "./messages.scss"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest"
import { Link } from "react-router-dom"
import moment from "moment"
import Box from "./Box";

const Messages = () => {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const queryClient = useQueryClient();
    const { isLoading, error, data } = useQuery({
        queryKey: ["conversations"],
        queryFn: () => newRequest.get(`/conversations`).then((res) => {
            return res.data
        })
    })
    const mutation = useMutation({
        mutationFn: (id) => {
            return newRequest.put(`/conversations/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["conversations"])
        }
    })
    const handleRead = (id) => {
        mutation.mutate(id)
    }

    //user
    // const id = currentUser.isSeller ? c.buyerId : c.sellerId
    // const { isLoading: uLoading, data: uData } = useQuery({
    //     queryKey: ["user"],
    //     queryFn: () => newRequest.get(`/users` + id).then((res) => {
    //         return res.data
    //     })
    // })

    return (
        <div className="Messages">
            {isLoading ? "Looding" : error ? "Something went wrong" :
                <div className="container">
                    <div className="title">
                        <h1>Messages</h1>
                    </div>
                    <table>
                        <tr>
                            <th>Buyer</th>
                            <th>Last Message</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                        {data.map((c) => (
                            // <Box c={c} key={c.id} />
                            <tr key={c.id} className={((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer)) &&
                                ("active")}>
                                <td>{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
                                <td><Link to={`/message/${c.id}`} className="link">{c?.lastMessage?.substring(0, 100)}...</Link></td>
                                <td>{moment(c.updatedAt).fromNow()}</td>
                                <td>
                                    {((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer)) &&
                                        (<button onClick={() => (handleRead(c.id))}>Mark as Read</button>)}
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>}
        </div>
    )
}
export default Messages