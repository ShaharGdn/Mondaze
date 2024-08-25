import { Modal, Box, Typography, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { IoCloseOutline } from "react-icons/io5";


export function AddBoardModal({ open, onClose }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 540,
                    height: 400,
                    bgcolor: 'background.paper',
                    borderRadius: '0.4rem',
                    boxShadow: 24,
                    p: 4
                }}
            >
                <button className="close-btn-board-modal" onClick={onClose}>
                    <IoCloseOutline />
                </button>
                <Box id="modal-title" variant="h6" component="h2">
                    Create board
                </Box>
                <Box className="modal-description" sx={{ mt: 2 }}>
                    Board name
                    <input type="text" className="board-name-input" value="New Board" />

                    <hr />

                    <div className="radio-btns-select-type">
                        <p>Select what you're managing in this board</p>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="Items"
                                name="radio-buttons-group"
                                row
                            >
                                <FormControlLabel value="Items" control={<Radio />} label="Items" />
                                <FormControlLabel value="Leads" control={<Radio />} label="Leads" />
                                <FormControlLabel value="Tasks" control={<Radio />} label="Tasks" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </Box>
            </Box>
        </Modal>
    )
}
