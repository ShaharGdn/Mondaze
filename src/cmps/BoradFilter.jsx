import { useEffect, useRef, useState } from "react";
import { EMPTY_PERSON, FILTER_ICON, GROUP_BY, ICON_SEARCH } from "./icons/svg-icons.jsx";
import { debounce } from "../services/util.service";
import { Popover } from "./popovers/Popover.jsx";

export function BoardFilter({ filterBy, onSetFilterBy, displayType, setGroupBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [isSearchInputOpen, setSearchInputOpen] = useState(false)
    const [open, setOpen] = useState(null)
    const inputRef = useRef(null)

    useEffect(() => {
        if (filterByToEdit.txt !== filterBy.txt) {
            onSetFilterBy(filterByToEdit)
        }
        if (isSearchInputOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isSearchInputOpen, filterByToEdit])

    function onToggleSearchInput(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        setSearchInputOpen((prevOpen) => !prevOpen)
    }

    function handleChange(ev) {
        if (ev) ev.preventDefault()
        const { target } = ev
        const { type, value, name: field } = target

        setFilterByToEdit(prevFilterByToEdit => ({ ...prevFilterByToEdit, [field]: value }))
    }

    function handleBlur() {
        if (filterByToEdit.txt) return
        setSearchInputOpen(false)
    }

    const { txt } = filterByToEdit
    return (
        <section className="board-filter-sort-actions">
            <div className="search-wrapper">
                <div onClick={onToggleSearchInput}
                    className={isSearchInputOpen ? "search-container hidden" : "search-container"}>
                    <ICON_SEARCH className="icon" />
                    <span>Search</span>
                </div>
                <label htmlFor="search" className="search-label">
                    <ICON_SEARCH className="icon" />
                    <input
                        type="search"
                        name="txt"
                        id="search"
                        className={isSearchInputOpen ? "search-input open" : "search-input hidden"}
                        onBlur={() => handleBlur()}
                        onInput={handleChange}
                        ref={inputRef}
                        autoFocus
                        placeholder="Search this board"
                        value={txt} />
                </label>
            </div>
            <div className="person-filter">
                <EMPTY_PERSON className="icon" />
                <span>Person</span>
            </div>
            {/* <div className="filter">
                <FILTER_ICON className="icon" />
                <span>Filter</span>
            </div> */}
            {displayType === "kanban" &&
                <Popover
                    trigger={<div className="group-by">
                        <GROUP_BY className="icon" />
                        <span>Group By</span>
                    </div>}
                    open={open}
                    setOpen={setOpen}
                    children={
                        <div className="grouping-types">
                            <span onClick={() => setGroupBy("status")}>Status</span>
                            <span onClick={() => setGroupBy("priority")}>Priority</span>
                        </div>
                    }
                >
                </Popover>}
        </section>
    )
}