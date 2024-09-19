import { useSelector } from "react-redux";
import { ICON_CLOSE_SQUARE } from "../icons/svg-icons";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { FaFileAlt } from "react-icons/fa"; // Import a file icon for non-image files

export function FilesPicker({ onUpdatePulse, pulse }) {
    const board = useSelector(storeState => storeState.selectedBoardModule.board)
    const MAX_FILE_SIZE_MB = 1

    function onClearFile(event) {
        event.preventDefault()
        event.stopPropagation()
        const pulseToUpdate = {
            ...pulse, file: ''
        };
        onUpdatePulse(pulseToUpdate)
    }

    function handleFileUpload() {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', '*/*') // Allows all file types
        input.click()

        input.onchange = () => {
            const file = input.files[0]
            if (file) {
                const fileSizeMB = file.size / (1024 * 1024)
                if (fileSizeMB > MAX_FILE_SIZE_MB) {
                    alert(`File size exceeds ${MAX_FILE_SIZE_MB} MB limit.`)
                    return
                }

                if (file.type.startsWith('image/')) {
                    // Handle image file
                    const reader = new FileReader()
                    reader.onload = () => {
                        onUpdatePulse({ ...pulse, file: reader.result }) // Store the image as a data URL
                    }
                    reader.readAsDataURL(file)
                } else {
                    // Handle other file types
                    onUpdatePulse({ ...pulse, file: file.name }) // Store the file name
                }
            }
        }
    }

    return (
        <div className="pulse-text-container">
            <form className="input-container">
                <span className={pulse.file ? 'pulse-text with-text' : 'pulse-text null'} onClick={handleFileUpload}>
                    {pulse.file ? (
                        pulse.file.endsWith('.jpg') || pulse.file.endsWith('.png') ? (
                            <img src={pulse.file} alt="Uploaded File" className="uploaded-img" />
                        ) : (
                            <div className="file-icon-container">
                                <FaFileAlt className="file-icon"/>
                            </div>
                        )
                    ) : (
                        <div className="empty-text file hidden">
                            <BsFillPlusCircleFill />
                            <CiFileOn className="t-icon" />
                        </div>
                    )}
                    <ICON_CLOSE_SQUARE className="close-btn hidden" onClick={onClearFile} />
                </span>
            </form>
        </div>
    )
}
