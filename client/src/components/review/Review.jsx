import { useQuery } from "@tanstack/react-query"
import "./review.scss"
import newRequest from "../../utils/newRequest"

const Review = ({ review }) => {
    const { isLoading, error, data } = useQuery({
        queryKey: [review.userId],
        queryFn: () => newRequest.get(`/users/${review.userId}`).then((res) => {
            return res.data
        })
    })
    // console.log(data)
    return (
        <div className="review">
            {isLoading ? "looooooding" : error ? "Something went raaaang !!!" : <div className="user">
                <img className="pp" src={data.img || "/img/noavatar.jpg"} alt="" />
                <div className="info">
                    <span>{data.username}</span>
                    <div className="country">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_India.png/800px-Flag_of_India.png" alt="" />
                        <span>{data.country}</span>
                    </div>
                </div>
            </div>}
            <div className="stars">
                {Array(review.star).fill().map((item, i) => (
                    <img key={i} src="/img/star.png" alt="" />
                ))}
                <span>{review.star}</span>
            </div>
            <p>
                {review.desc}
            </p>
            <div className="helpful">
                <span>Helful?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
            </div>
        </div>
    )
}

export default Review