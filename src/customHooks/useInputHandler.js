import { useRef, useState } from "react"

export const useInputHandler = (initialPropState, callBack) => {
    const [isBlurred, setIsBlurred] = useState(false)
    const [propToEdit, setPropToEdit] = useState(initialPropState)
    const [isEditable, setIsEditable] = useState(false)
    const inputRef = useRef(null)

    function handleSubmit(ev) {
        if (ev) ev.preventDefault()
        if (isBlurred) return
        if (propToEdit !== initialPropState) {
            callBack(propToEdit)
        }
        setIsBlurred(true)
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.blur()
            }
        }, 0)
    }

    function handleBlur() {
        setIsEditable(false)
        if (isBlurred) return
        handleSubmit()
    }

    return [inputRef, setIsBlurred, propToEdit, setPropToEdit,
        isEditable, setIsEditable, handleBlur, handleSubmit]
}