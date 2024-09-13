import Quill from 'quill'

import { useEffect, useRef, useState } from "react"


export function QuillEditor({ loggedInUser, onAddUpdate }) {
    const quillRef = useRef(null) // Use ref for the Quill editor container
    const toolbarRef = useRef(null) // Use ref for the custom toolbar container
    const [editorContent, setEditorContent] = useState('')
    const quillInstanceRef = useRef(null)
    const MAX_FILE_SIZE_MB = 3

    useEffect(() => {
        if (quillRef.current && toolbarRef.current) {
            const quill = new Quill(quillRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: toolbarRef.current,
                },
            })

            quill.getModule('toolbar').addHandler('image', () => {
                handleImageUpload()
            })

            quillInstanceRef.current = quill;

            quill.on('text-change', () => {
                const content = quill.root.innerHTML
                setEditorContent(content)
            })

            return () => {
                quill.disable() // Cleanup on component unmount
                quill.container.remove()

                if (quillInstanceRef.current) { //clear text area and content of local state on unmount
                    quillInstanceRef.current.setText('')
                }
                setEditorContent('')
            }
        }
    }, [])

    function addUpdate() {
        const newUpdate = {
            createdBy: loggedInUser,
            createdAt: new Date(),
            content: editorContent,
        }

        onAddUpdate(newUpdate)

        if (quillInstanceRef.current) {
            quillInstanceRef.current.setText('')
        }
        setEditorContent('')
    }

    const handleImageUpload = () => {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()

        input.onchange = () => {
            const file = input.files[0]
            if (file) {
                const fileSizeMB = file.size / (1024 * 1024)
                if (fileSizeMB > MAX_FILE_SIZE_MB) {
                    alert(`File size exceeds ${MAX_FILE_SIZE_MB} MB limit.`)
                    return;
                }

                const reader = new FileReader();
                reader.onload = () => {
                    const range = quillInstanceRef.current.getSelection()
                    quillInstanceRef.current.insertEmbed(range.index, 'image', reader.result)
                }
                reader.readAsDataURL(file)
            }
        }
    }

    return (
        <div className="editor-wrapper">
            {/* Custom toolbar */}
            <div ref={toolbarRef} className="editor-toolbar">
                <span className="ql-formats">
                    <select className="ql-header" defaultValue="">
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value=""></option>
                    </select>
                </span>
                <span className="ql-formats">
                    <button className="ql-bold"></button>
                    <button className="ql-italic"></button>
                    <button className="ql-underline"></button>
                    <button className="ql-strike"></button>
                </span>
                <span className="ql-formats">
                    <button className="ql-list" value="ordered"></button>
                    <button className="ql-list" value="bullet"></button>
                </span>
                <span className="ql-formats">
                    <button className="ql-link"></button>
                    <button className="ql-image"></button>
                </span>
            </div>

            {/* Quill editor container */}
            <div className="editor-container">
                <div ref={quillRef}></div>
            </div>

            <div className="editor-footer">
                <div className="footer-icons"></div>
                <button className="update-btn" onClick={addUpdate}>Update</button>
            </div>
        </div>
    )
}