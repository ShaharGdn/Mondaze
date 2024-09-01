import { FaRegStar, FaStar } from "react-icons/fa6";


export function BoardDetailsContent({ board }) {
    return (
        <div className="board-details-popover">
            <div className="board-title">
                <h3>{board.title}</h3>
                <div className="toggle-favorite">
                    {!board.isStarred ?
                        <FaStar color="#ffcb00" size={19} /> :
                        <FaRegStar size={19} />}
                </div>
            </div>
            <p>Manage any type of project. Assign owners, set timelines and keep track of where your project stands.</p>
            <div>Board info</div>
            {/* <div>
                <div>Board type</div>
                <span>Main</span>
            </div>
            <div>
                <div>Owner</div>
                <div>
                    <img
                        alt="Shahar Bussines"
                        src="https://files.monday.com/euc1/photos/65494569/thumb_small/65494569-user_photo_initials_2024_08_31_08_06_29.png?1725091589"
                    />
                    <div>Shahar Bussines</div>
                </div>
            </div>
            <div>
                <div>Created by</div>
                <button>
                    <img
                        src="https://files.monday.com/euc1/photos/65494569/thumb/65494569-user_photo_initials_2024_08_31_08_06_29.png?1725091589"
                        className="person-bullet-image"
                    />
                    on Aug 31, 2024
                </button>
            </div> */}
        </div>
    );
}
