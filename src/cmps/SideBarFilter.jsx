import { useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

export function SideBarFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        if (filterByToEdit.txt !== filterBy.txt) {
            onSetFilterBy(filterByToEdit)
        }
    }, [filterByToEdit])

    function handleChange(ev) {
        const { value, name: field } = ev.target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    return (
        <div className="search-container">
            <div><HiMagnifyingGlass /></div>
            <input
                id="txt"
                onChange={handleChange}
                autoFocus
                name="txt"
                type="search"
                placeholder="Search"
                value={filterByToEdit.txt}
            />
        </div>
    )
}