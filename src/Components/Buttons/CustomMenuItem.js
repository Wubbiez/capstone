import React from 'react';
import { MenuItem } from '@mui/material';

function CustomMenuItem({ label, id, handleClick }) {
    return (
        <MenuItem onClick={() => handleClick(id)}>
            {label}
        </MenuItem>
    );
}

export default CustomMenuItem;
