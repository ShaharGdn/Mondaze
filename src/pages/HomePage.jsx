import { useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../store/actions/user.actions";

import logo from ".././assets/img/mondaze-logo.png"
import static_carousel from ".././assets/img/static-carousel.avif"
import bd from ".././assets/img/customers/bd.png"
import canva from ".././assets/img/customers/canva.png"
import carrefour from ".././assets/img/customers/carrefour.png"
import coca_cola from ".././assets/img/customers/coca_cola.png"
import glossier from ".././assets/img/customers/glossier.png"
import HoltCat from ".././assets/img/customers/HoltCat.avif"
import lionsgate from ".././assets/img/customers/lionsgate.avif"
import oxy from ".././assets/img/customers/oxy.png"
import universal from ".././assets/img/customers/universal.png"

export function HomePage() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    // const [tags, setTags] = useState(null)
    const navigate = useNavigate()


    // function handleImg() {

    // }

    return (
        <section className="home-page full">
            <header className="header">
                <img src={logo} alt="" className="logo" onClick={() => navigate('/board')} />
                <div className="header-btns">
                    {!loggedInUser?._id && <a className="login-btn" href="/login">Log in</a>}
                    {loggedInUser?._id && <a className="login-btn" href="" onClick={logout}>Logout</a>}
                    <button className="get-started" onClick={() => navigate('/board')}>
                        <span>Get Started</span>
                        <IoMdArrowForward className="icon" />
                    </button>
                </div>
            </header>

            <main className="main-display poppins-extralight">
                <div className="titles-tags-wrapper">
                    <h1 className="title poppins-extralight">
                        Your go-to work platform
                    </h1>
                    <p className="subtitle">Streamline workflows and gain clear visibility across teams
                        to make strategic decisions with confidence.
                    </p>
                    <button className="get-started" onClick={() => navigate('/board')}>
                        <span>Get Started</span>
                        <IoMdArrowForward className="icon" />
                    </button>
                    <p className="offer">No credit card needed  ✦  Unlimited time on Free plan</p>

                    <div className="project-types-display">
                        <div className="use-cases-container">

                        </div>
                        <div className="assets-container">
                            <img src={static_carousel} alt="" />
                        </div>
                    </div>
                </div>

                <div className="customers">
                    <h5 className="title poppins-regular">Trusted by 225,000+ customers, from startups to enterprises</h5>
                    <div className="clients-logos">
                        <div className="images-gallery">
                            <img src={HoltCat} alt="holt logo" />
                        </div>
                        <div className="images-gallery">
                            <img src={canva} alt="canva logo" />
                        </div>
                        <div className="images-gallery">
                            <img src={coca_cola} alt="coca-cola logo" />
                        </div>
                        <div className="images-gallery">
                            <img src={oxy} alt="oxy logo" />
                        </div>
                        <div className="images-gallery">
                            <img src={lionsgate} alt="lionsgate logo" />
                        </div>
                        <div className="images-gallery">
                            <img src={carrefour} alt="carrefour logo" />
                        </div>
                        <div className="images-gallery">
                            <img src={bd} alt="bd logo" />
                        </div>
                        <div className="images-gallery">
                            <img src={glossier} alt="glossier logo" />
                        </div>
                        <div className="images-gallery">
                            <img src={universal} alt="universal logo" />
                        </div>
                    </div>
                </div>

                <div className="videos-container">
                    <div className="work-management">
                        <div className="title">
                            <img src="../src/assets/img/wm-square-logo.png" alt="" />
                            <h2>mondaze work management</h2>
                            <h3 className="poppins-extralight">Manage projects & tasks</h3>
                            <button className="get-started" onClick={() => navigate('/board')}>
                                <span>Get Started</span>
                                <IoMdArrowForward className="icon" />
                            </button>
                        </div>
                        <video autoPlay muted loop playsInline>
                            <source src="https://dapulse-res.cloudinary.com/video/upload/q_auto,f_auto,cs_copy/remote_mondaycom_static/uploads/Yotam_Ron/110224-card-vid-wm-v1.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="work-management">
                        <div className="title white">
                            <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/uploads/mayatauber/Group_1261164293.png" alt="monday CRM logo" />
                            <h2>mondaze CRM</h2>
                            <h3 className="poppins-extralight">Streamline sales processes</h3>
                            <button className="get-started white" onClick={() => navigate('/board')}>
                                <span>Get Started</span>
                                <IoMdArrowForward className="icon" />
                            </button>
                        </div>
                        <video autoPlay muted loop playsInline>
                            <source src="https://dapulse-res.cloudinary.com/video/upload/q_auto,f_auto,cs_copy/remote_mondaycom_static/uploads/Yotam_Ron/110224-card-vid-crm-v1.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

            </main>
            <footer>
                <main className="main-footer">
                    <div className="cta-section poppins-extralight">
                        <p>Deliver your best work</p>
                        <p>with <span>mondaze.com</span></p>
                        <button className="get-started white" onClick={() => navigate('/board')}>
                            <span>Get Started</span>
                            <IoMdArrowForward className="icon" />
                        </button>
                    </div>
                    <div className="dev-pics">
                        {/* <img src={teamImg} alt="developers pictures" /> */}
                        <img src="https://i.postimg.cc/pLD0Tw3L/contact-sales.png" alt="developers pictures" />
                    </div>
                </main>
                <div className="logo-nav poppins-extralight">
                    <img src={logo} alt="logo" onClick={() => navigate('/board')} />
                    <span>© All Rights Reserved</span>
                </div>
            </footer>
        </section>
    )
}