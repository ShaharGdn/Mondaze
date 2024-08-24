import { GoHome } from "react-icons/go";
import { GoStar } from "react-icons/go";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router";

export function SideBar() {
    const navigate = useNavigate()

    return (
        <article className="side-bar-container open Figtree-regular">
            <nav>
                <div className="home-link" onClick={() => navigate('/board')}>
                    <GoHome size={20} />
                    <span>Home</span>
                </div>
                <div className="border"></div>

                {/* <hr /> */}

                <div className="favorites">
                    <GoStar size={20} />
                    <span>Favorites</span>
                </div>

                {/* <hr /> */}
                <div className="border"></div>


                <div className="ws-cmp Figtree-bold">
                    <span className="ws-icon">M</span>
                    <div>My Workspace</div>
                </div>

                <div className="search-add">
                    <div className="search-container">
                        <div><HiMagnifyingGlass /></div>
                        <input id="txt" onChange={(ev) => handleChange(ev, 'filter')} autoFocus name="txt" type="text" placeholder="Search" />
                    </div>
                    <button className="add-board-btn">
                        <i class="fa-regular fa-plus-large fa-lg"></i>
                    </button>
                </div>
            </nav>
        </article>
    )
}