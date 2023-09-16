import React from 'react'
import { Link } from "react-router-dom"
import moment from "moment"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import newRequest from '../../utils/newRequest'


const Box = ({ c }) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const queryClient = useQueryClient();
    //user
    const id = currentUser.isSeller ? c.buyerId : c.sellerId
    const { isLoading: uLoading, data: uData } = useQuery({
        queryKey: ["user"],
        queryFn: () => newRequest.get(`/users/${id}`).then((res) => {
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
    // console.log(uData);
    return (
        <tr key={c.id} className={((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer)) &&
            ("active")}>
            <td>{uData.username}</td>
            <td><Link to={`/message/${c.id}`} className="link">{c?.lastMessage?.substring(0, 100)}...</Link></td>
            <td>{moment(c.updatedAt).fromNow()}</td>
            <td>
                {((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer)) &&
                    (<button onClick={() => (handleRead(c.id))}>Mark as Read</button>)}
            </td>
        </tr>
    )
}

export default Box