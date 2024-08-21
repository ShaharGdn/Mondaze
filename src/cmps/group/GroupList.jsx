import { GroupPreview } from "./GroupPreview";

export function GroupList({ groups, onRemoveGroup, onUpdateGroup }) {

    return (
        <section className="groups-container">
            <ul className="group-list">
                {groups.map(group =>
                    <li className="group" style={group.style} key={group.id}>
                        <GroupPreview
                            group={group}
                            onRemoveGroup={onRemoveGroup}
                            onUpdateGroup={onUpdateGroup} />
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