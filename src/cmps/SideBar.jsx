import { GoHome } from "react-icons/go";
import { GoStar } from "react-icons/go";


export function SideBar() {
    return (
        <article className="side-bar-container open Figtree-regular">
            <nav>
                <div className="home-link">
                    <GoHome size={20} />
                    <span>Home</span>
                </div>

                <hr />

                <div className="favorites">
                    <GoStar size={20} />
                    <span>Favorites</span>
                </div>

                <hr />

                <div className="ws-cmp Figtree-bold">
                    <span className="ws-icon">M</span>
                    <div>My Workspace</div>
                </div>
                
                <div>
                    <input type="search" />
                    <button>+</button>
                </div>

            </nav>
        </article>
    )
}