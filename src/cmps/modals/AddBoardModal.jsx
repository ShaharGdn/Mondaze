import { Modal, Box, Button, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { IoCloseOutline } from "react-icons/io5"
import { boardService } from '../../services/board'
import { useState } from 'react'
import { addBoard } from '../../store/actions/board.actions'

export function AddBoardModal({ open, onClose }) {
    const [boardToAdd, setBoardToAdd] = useState(boardService.getEmptyBoard())

    async function onAddBoard(ev) {
        var board = boardService.getEmptyBoard(boardToAdd.type)

        board = {
            ...board, title: boardToAdd.title
        }
        ev.preventDefault()
        // console.log('Board data:', board)
        addBoard(board)
        setBoardToAdd(boardService.getEmptyBoard())
        onClose()
    }

    const handleChange = (ev) => {
        const { name, value } = ev.target
        setBoardToAdd(prevBoard => ({ ...prevBoard, [name]: value }))
    }

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
                    top: '42%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 540,
                    height: 400,
                    bgcolor: 'background.paper',
                    borderRadius: '0.4rem',
                    boxShadow: 24,
                    p: 4
                }}
                className="create-board-modal"
            >
                <button className="close-btn-board-modal" onClick={onClose}>
                    <IoCloseOutline />
                </button>
                <Box className="modal-title Figtree-semi-bold" variant="h6" component="h2">
                    Create board
                </Box>
                <Box className="modal-description Figtree-regular">
                    <span>Board name</span>
                    <input
                        type="text"
                        className="board-name-input Figtree-regular"
                        name="title"
                        value={boardToAdd.title || ''}
                        onChange={handleChange}
                        autoFocus
                    />
                </Box>
                <div className="border"></div>
                <div className="radio-btns-select-type">
                    <p className="Figtree-semi-bold">Select what you're managing in this board</p>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Task"
                            name="type"
                            row
                            className="radio-buttons-group"
                            onChange={handleChange}
                        >
                            <FormControlLabel value="Task" control={<Radio />} label="Tasks" />
                            <FormControlLabel value="Item" control={<Radio />} label="Items" />
                            <FormControlLabel value="Lead" control={<Radio />} label="Leads" />
                        </RadioGroup>
                    </FormControl>
                    <div className="modal-action-btns">
                        <button className="cancel-btn" onClick={onClose}>Cancel</button>
                        <Button variant="contained" className="create-board-btn" onClick={onAddBoard}>Create Board</Button>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}
