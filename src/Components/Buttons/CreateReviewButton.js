import React, {useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Rating,
    TextField
} from "@mui/material";

import {Star} from '@mui/icons-material/';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function CreateReviewButton({user, product_id, setRefresh}) {
    const [isCreating, setIsCreating] = useState(false);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(null);
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    async function handleSubmit() {
        setIsCreating(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_EC2_PUBLIC_IP}/api/reviews/${product_id}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({user, title, content, rating})
            });

            if (response.ok) {
                const item = await response.json();
                console.log(item);
            }
        } catch (error) {
            console.error(error);
        }
        setIsCreating(false);
        setOpen(false);
        setRefresh(true);
    }


    return (
        <>
            <Button
                variant="contained"
                disabled={isCreating}
                onClick={handleClickOpen}
                sx={{
                    backgroundColor: '#457B9D',
                    color: '#F1FAEE',
                    fontSize: 'calc(0.9rem + 0.2vw)',
                    '&:hover': {
                        backgroundColor: '#A8DADC',
                        color: '#333333',
                        boxShadow: '1px 2px 1px 1px #1D3557'
                    }
                }}
            >
        
      
                Leave Review </Button>


            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        backgroundColor: "white",
                        boxShadow: "none",
                    },
                }}
            >
                <DialogTitle>Leave Review:</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please tell us what you think about the product!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="title"
                        type="title"
                        fullWidth
                        variant="standard"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        required
                    />
                    <TextField label="Message" multiline rows={4} placeholder="Type your review here" variant="outlined"
                               fullWidth required
                               value={content}
                               onChange={(e) => {
                                   setContent(e.target.value);
                               }}
                    />

                    <Rating
                        name="hover-feedback"
                        value={rating}
                        precision={0.5}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                        emptyIcon={<Star style={{opacity: 0.55}} fontSize="inherit"/>}
                    />
                    {value !== null && (
                        <Box sx={{ml: 2}}>{labels[hover !== -1 ? hover : value]}</Box>
                    )}


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}

export default CreateReviewButton;