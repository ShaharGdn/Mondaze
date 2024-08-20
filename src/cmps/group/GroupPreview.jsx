export function GroupPreview({ group, onRemoveGroup }) {

    return (
        <section className="group-preview">
            <h2>{group.title}</h2>
            <button onClick={() => onRemoveGroup(group.id)}>Remove group</button>

        </section >
    )
}