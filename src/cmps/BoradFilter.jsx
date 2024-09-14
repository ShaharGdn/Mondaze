import { useEffect, useRef, useState } from "react";
import { EMPTY_PERSON, FILTER_ICON, GROUP_BY, ICON_SEARCH } from "./icons/svg-icons.jsx";
import { debounce } from "../services/util.service";
import { Popover } from "./popovers/Popover.jsx";


export function BoardFilter({ filterBy, onSetFilter, displayType, setGroupBy }) {
    const [isSearchInputOpen, setSearchInputOpen] = useState(false)
    const [isBlurred, setIsBlurred] = useState(false)
    const [open, setOpen] = useState(null)
    const onDebouncedSetFilter = useRef(debounce(onSetFilter, 300))

    // console.log('isSearchInputOpen:', isSearchInputOpen)

    useEffect(() => {
        if (isSearchInputOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isSearchInputOpen])

    function onToggleSearchInput(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        setSearchInputOpen((prevOpen) => !prevOpen)
    }

    function handleChange(ev) {
        if (ev) ev.preventDefault()
        const { target } = ev
        console.log('target:', target.value)
        // if (isBlurred) return
        // if (propToEdit !== initialPropState) {
        //     callBack(propToEdit)
        // }
        // setIsBlurred(true)
        // setTimeout(() => {
        //     if (inputRef.current) {
        //         inputRef.current.blur()
        //     }
        // }, 0)
        // if (isInputOnly) setPropToEdit('')
    }

    function handleBlur() {
        setSearchInputOpen(false)
        if (isBlurred) return
        // handleSubmit()
        // if (isInputOnly) setPropToEdit('')
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
                        onInput={() => debounce(handleChange)}
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
                            <span onClick={()=> setGroupBy("status")}>Status</span>
                            <span onClick={()=> setGroupBy("priority")}>Priority</span>
                        </div>
                    }
                >
                </Popover>}
        </section>
    )
}