import { useSelector } from "react-redux";
import { GroupPreview } from "./GroupPreview";

export function GroupList({ groups, onRemoveGroup }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)

    return (
        <section className="groups-container">
            <ul className="group-list">
                {board.groups.map(group =>
                    <li className="group" key={group.id}>
                        <GroupPreview group={group} onRemoveGroup={onRemoveGroup} />
                        {/* <div className="actions">
                        <button onClick={() => onUpdateBoard(group)}>Edit</button>
                        <button onClick={() => onRemoveBoard(group.id)}>x</button>
                    </div> */}
                    </li>)
                }
            </ul>
        </section>
    )
}