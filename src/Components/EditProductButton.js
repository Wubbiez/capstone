import {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Radio,
    RadioGroup
} from "@mui/material";
import {FormControlLabel, TextField} from "@mui/material/";
import {updateProduct} from "../api/apirequests.js";

function EditProductButton ({product_id , title: initialTitle, description: initialDescription, price: initialPrice, image: initialImage, inStock: initialInStock, category: initialCategory}) {
    const [isEditing, setIsEditing] = useState(false);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [price, setPrice] = useState(initialPrice);
    const [image, setImage] = useState(initialImage);
    const [inStock, setInStock] = useState(initialInStock);
    const [category, setCategory] = useState(initialCategory);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    async function handleSubmit() {
        setIsEditing(true);
        try {
            await updateProduct(product_id, title, description, price, image, inStock, category)
        } catch (error) {
            console.error(error);
        }
        setIsEditing(false);
        setOpen(false);
    }

    return (
        <>
        <Button
            variant="contained"
            color="primary"
            disabled={isEditing}
            onClick={handleClickOpen}
        >
            {'Edit Product'}
        </Button>

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
        <DialogTitle>Update Product:</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please edit any fields you wish to update.
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
            />
            <TextField
                autoFocus
                margin="dense"
                id="description"
                label="description"
                type="description"
                fullWidth
                variant="standard"
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            />
            <TextField
                autoFocus
                margin="dense"
                id="price"
                label="price"
                type="price"
                fullWidth
                variant="standard"
                value={price}
                onChange={(e) => {
                    setPrice(e.target.value);
                }
                }
            />
            <TextField
                autoFocus
                margin="dense"
                id="image"
                label="image"
                type="image"
                fullWidth
                variant="standard"
                value={image}
                onChange={(e) => {
                    setImage(e.target.value);
                }
                }
            />
            <TextField
                autoFocus
                margin="dense"
                id="inStock"
                label="inStock"
                type="inStock"
                fullWidth
                variant="standard"
                value={inStock}
                onChange={(e) => {
                    setInStock(e.target.value);
                }
                }
            />
            <TextField
                autoFocus
                margin="dense"
                id="category"
                label="category"
                type="category"
                fullWidth
                variant="standard"
                value={category}
                onChange={(e) => {
                    setCategory(e.target.value);
                }
                }
            />

        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
    </Dialog>
        </>
    );
}

export default EditProductButton;