import { useState } from "react";
import { IoMdArrowForward } from "react-icons/io";


export function HomePage() {
    const [tags, setTags] = useState(null)

    function handleImg() {

    }

    return (
        <section className="home-page full">

            <header className="header">
                <img src="" alt="" className="logo" />
                <button className="get-started">
                    <span>Get Started</span>
                    <IoMdArrowForward className="icon" />
                </button>
            </header>

            <main className="main-display">
                <h1 className="title">
                    Your go-to work platform
                </h1>
                <p>Streamline workflows and gain clear visibility across teams <br />
                    to make strategic decisions with confidence.
                </p>
                <button className="get-started">
                    <span>Get Started</span>
                    <IoMdArrowForward className="icon" />
                </button>
                <p>No credit card needed  ✦  Unlimited time on Free plan</p>

                <div className="project-types-display">
                    <div className="use-cases-container">

                    </div>
                    <div className="assets-container">
                        <img src="src/assets/img/static-carousel.avif" alt="" />
                    </div>
                </div>

            <div className="customers">
                    <h5></h5>                
                    <div className="clients-logos">
                        <img src="src/assets/img/costumers/HoltCat.avif" alt="holt logo" />
                        <img src="src/assets/img/costumers/canva.png" alt="canva logo" />
                        <img src="src/assets/img/costumers/coca_cola.png" alt="coca-cola logo" />
                        <img src="src/assets/img/costumers/oxy.png" alt="oxy logo" />
                        <img src="src/assets/img/costumers/lionsgate.avif" alt="lionsgate logo" />
                        <img src="src/assets/img/costumers/carrefour.png" alt="carrefour logo" />
                        <img src="src/assets/img/costumers/bd.png" alt="bd logo" />
                        <img src="src/assets/img/costumers/glossier.png" alt="glossier logo" />
                        <img src="src/assets/img/costumers/universal.png" alt="univarsal logo" />
                    </div>
            </div>

                <div className="work-management">
                    <img src="src/assets/img/wm-square-logo.png" alt="" />
                    <h2>mondaze work management</h2>
                    <h3>Manage projects & tasks</h3>
                    <button className="get-started">
                        <span>Get Started</span>
                        <IoMdArrowForward className="icon" />
                    </button>
                    <video loop="">
                        <source src="https://dapulse-res.cloudinary.com/video/upload/q_auto,f_auto,cs_copy/remote_mondaycom_static/uploads/Yotam_Ron/110224-card-vid-wm-v1.mp4"></source>
                    </video>
                </div>

            </main>
        </section>
    )
}