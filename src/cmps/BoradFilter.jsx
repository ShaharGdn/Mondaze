import { useEffect, useRef, useState } from "react";
import { EMPTY_PERSON, FILTER_ICON, GROUP_BY, ICON_SEARCH } from "./icons/svg-icons.jsx";
import { debounce } from "../services/util.service";
import { Popover } from "./popovers/Popover.jsx";


export function BoardFilter({ filterBy, setFilterBy, displayType, setGroupBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [isSearchInputOpen, setSearchInputOpen] = useState(false)
    const [isBlurred, setIsBlurred] = useState(false)
    const [open, setOpen] = useState(null)

    useEffect(() => {
        setFilterByToEdit(filterBy)
        if (isSearchInputOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isSearchInputOpen, filterBy])

    function onToggleSearchInput(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        setSearchInputOpen((prevOpen) => !prevOpen)
    }

    function handleChange(ev) {
        if (ev) ev.preventDefault()
        const { target } = ev
        const { type, value } = target
      
        if (type === 'search') {
            const newFilterBy = {
                ...filterByToEdit,
                txt: value
            }
            setFilterBy(newFilterBy)
        }
    }

    function handleBlur() {
        setSearchInputOpen(false)
        inputRef.current.value = ''
        if (isBlurred) return
        // handleChange()
    }

    const inputRef = useRef(null)

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
                        id="search"
                        className={isSearchInputOpen ? "search-input open" : "search-input hidden"}
                        onBlur={() => handleBlur()}
                        onFocus={() => setIsBlurred(false)}
                        onInput={handleChange}
                        ref={inputRef}
                        autoFocus
                        placeholder="Search this board" />
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