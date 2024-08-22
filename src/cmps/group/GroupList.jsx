import { GroupPreview } from "./GroupPreview";

export function GroupList({ groups }) {
    return (
        <section className="groups-container">
            <ul className="group-list">
                {groups.map(group =>
                    <li className="group" style={group.style} key={group.id}>
                        <GroupPreview
                            group={group} />
                    </li>)
                }
            </ul>
        </section>
    )
}