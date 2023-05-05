import React, { useEffect, useRef, useState } from "react";
import "./gigs.scss"
// import { gigs } from "../../data"
import GigCard from "../../components/gigCard/GigCard"
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

const Gigs = () => {

    const [sort, setSort] = useState("sales")
    const [open, setOpen] = useState(false);

    const minRef = useRef();
    const maxref = useRef();

    const { search } = useLocation()
    const category = search.substring(5).toUpperCase();

    const reSort = (type) => {
        setSort(type)
        setOpen(false)
    }
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['gigs'],
        queryFn: () => newRequest.get(`/gigs${search}&min=${minRef.current.value}$max=${maxref.current.value}&sort=${sort}`).then((res) => {
            return res.data
        })
    })

    useEffect(() => {
        refetch();
    }, [sort])

    const apply = () => {
        refetch();
    }

    // console.log(data)

    return (
        <div className="gigs">
            <div className="container">
                <span className="breadcrumbs">LANCI > {category} > </span>
                <h1>{category}</h1>
                <p>Explore the boundaries of art and technology with Lanci's {category} Artists</p>
                <div className="menu">
                    <div className="left">
                        <span>Budget</span>
                        <input type="text" ref={minRef} placeholder="min" />
                        <input type="text" ref={maxref} placeholder="max" />
                        <button onClick={apply}>Apply</button>
                    </div>
                    <div className="right">
                        <span className="sortBy">SortBy</span>
                        <span className="sortType">{sort === "sales" ? "Best Selling" : "Newest"}</span>
                        <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
                        {open && <div className="rightMenu">
                            {sort === "sales" ? (<span onClick={() => reSort("createdAt")}>Newest</span>) :
                                (<span onClick={() => reSort("sales")}>Best Selling</span>)}
                        </div>}
                    </div>
                </div>
                <div className="cards">
                    {isLoading ? "loading" : error ? "Something went wrong" : data.map(gig => (
                        <GigCard key={gig._id} item={gig} />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Gigs