import { useEffect, useState } from 'react';
import { Box, Popover } from '@mui/material';

export function FixedPopover({ anchorEl, setAnchorEl, children, classNameContent }) {
    function handleClose(event) {
        event.preventDefault()
        event.stopPropagation()
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <Popover
            className={`pop-over ${id} Figtree-regular`}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            PaperProps={{
                sx: {
                    mt: 1.2,
                    ml: -1
                },
            }}
        >
            <Box sx={{ p: 0 }} className={classNameContent}>
                {children}
            </Box>
        </Popover >
    )
}