import React from "react";
import Featured from "../../components/featured/Featured";
import Slide from "../../components/slide/Slide";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import "./home.scss"
import { cards, projects } from "../../data"
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";

const Home = () => {
    return (
        <div className="home">
            <Featured />
            <TrustedBy />
            <Slide slidesToShow={5} arrowsScroll={5}>
                {cards.map(card => (
                    <CatCard item={card} key={card.id} />
                ))}
            </Slide>
            <div className="features">
                <div className="container">
                    <div className="item">
                        <h1>A whole of freelance talent at your fingertips</h1>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            The Best for every budget
                        </div>
                        <p>
                            Find high-quality services at every price point. No hourly rates,
                            just project based pricing.
                        </p>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            The Best for every budget
                        </div>
                        <p>
                            Find high-quality services at every price point. No hourly rates,
                            just project based pricing.
                        </p>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            The Best for every budget
                        </div>
                        <p>
                            Find high-quality services at every price point. No hourly rates,
                            just project based pricing.
                        </p>
                    </div>
                    <div className="item">
                        <video src="./img/video.mp4" controls></video>
                    </div>
                </div>
            </div>
            <div className="features dark">
                <div className="container">
                    <div className="item">
                        <h1>Lanci bussiness</h1>
                        <h1>A business solution designed for <i>teams</i></h1>
                        <p>
                            Upgrade to a curated experience packed with tools and benefits, dedicated to businesses
                        </p>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            Connect to freelancers with proven business experience
                        </div>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            Get matched with the perfect talent by a customer success manager                        </div>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            Manage teamwork and boost productivity with one powerful workspace
                        </div>
                        <button>Explore Lanci Bussiness</button>
                    </div>
                    <div className="item">
                        <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_836,dpr_1.0/v1/attachments/generic_asset/asset/7d30a5eab61a328ed8c036a1d998595d-1599837114294/business-mobile-836-x1.png" alt=""></img>
                    </div>
                </div>
            </div>
            <Slide slidesToShow={4} arrowsScroll={4}>
                {projects.map(card => (
                    <ProjectCard item={card} key={card.id} />
                ))}
            </Slide>
        </div>
    )
}
export default Home