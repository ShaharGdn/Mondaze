import Quill from 'quill'; // Import Quill directly

import { useEffect, useRef } from "react";


export function QuillEditor() {
    const quillRef = useRef(null); // Use ref for the Quill editor container
    const toolbarRef = useRef(null); // Use ref for the custom toolbar container

    useEffect(() => {
        if (quillRef.current && toolbarRef.current) {
            const quill = new Quill(quillRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: toolbarRef.current, // Use the ref to attach the toolbar
                },
            });

            return () => {
                quill.disable(); // Cleanup on component unmount
                quill.container.remove();
            };
        }
    }, []);


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
                <button className="update-btn">Update</button>
            </div>
        </div>
    )
}