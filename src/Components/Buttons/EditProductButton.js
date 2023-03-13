import {useEffect, useState} from "react";
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
import {updateProduct} from "../../api/apirequests.js";





function EditProductButton ({product_id , title: initialTitle, description: initialDescription, price: initialPrice, image: initialImage, in_stock: initialInStock, category: initialCategory, stripe_id, setRefresh}) {
    const [isEditing, setIsEditing] = useState(false);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [price, setPrice] = useState(initialPrice);
    const [image, setImage] = useState(initialImage);
    const [in_stock, setInStock] = useState(initialInStock);
    const [category, setCategory] = useState(initialCategory);


    const [productData, setProductData] = useState({
        title: initialTitle,
        description: initialDescription,
        price: initialPrice,
        image: initialImage,
        in_stock: initialInStock,
        category: initialCategory,
    });

    useEffect(() => {

    }, [productData]);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    async function handleSubmit() {
        setIsEditing(true);
        try {
            // const response = await editStripe(product_id, title, description, price, image, in_stock, category, stripe_id);
            const response = await updateProduct(product_id, title, description, price, image, in_stock, category, stripe_id);

            console.log(response);
            setRefresh(true);
            // window.location.reload();
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
                type="text"
                fullWidth
                variant="standard"
                value={image}
                onChange={(e) => {
                    setImage(e.target.value);
                }
                }
            />
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={in_stock}
                    name="radio-buttons-group"
                    onChange={(e) => {
                        setInStock(e.target.value);
                    }}
                >
                    <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="In stock"
                    />
                    <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="Out of stock"
                    />
                </RadioGroup>
            </FormControl>
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