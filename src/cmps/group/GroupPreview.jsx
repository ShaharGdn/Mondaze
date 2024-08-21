export function GroupPreview({ group, onRemoveGroup, onUpdateGroup }) {

    function onUpdate() {
        const newTitle = prompt('Title?')
        const titleColor = prompt('Title Color?')

        const updatedGroup = { ...group, title: newTitle, style: { ...group.style, color: titleColor } }
        onUpdateGroup(updatedGroup)
    }

    return (
        <section className="group-preview">
            <h2>{group.title}</h2>
            <button onClick={() => onRemoveGroup(group.id)}>Remove</button>
            <button onClick={onUpdate}>Update</button>

        </section >
    )
}