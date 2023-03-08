import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Typography,
    Modal,
    Paper,
    Box
} from "@mui/material";

function SingleProductModal({product_id, title, description, price, image, in_stock, category}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }  

  return (
    <React.Fragment>
       <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
        >
            {'View Single Product'}
        </Button>

        <Modal
                    open={isOpen}
                    onClose={handleCloseModal}
            
        >
          <Paper sx={{
            margin: "5vh 10vw 5vh 10vw",
            boxShadow: "10px 10px 2px 1px rgba(0, 0, 0, 0.2)",
            height: "70vh",
            maxHeight: "85vh",
            width: "75vw",
            padding: "5vh 10px 10px 10px"
          }}>
            <Typography variant='h1'>{title}</Typography>
            
            <Typography variant='h4'>$ {price}</Typography>
            <Typography variant='h4'>Category:</Typography>
            <Typography variant='p'>{category}</Typography>
            <Typography variant='h4'>Description:</Typography>
            <Typography variant='p'>{description}</Typography>
            <br></br>
            <Box
        component="img"
        sx={{
          maxHeight:"45vh",
          maxWidth:  "20vw",
          padding: "15px 5px 15px 5px"
        }}
        alt="title"
        src={image}
      />
            <br></br>
            <Button onClick={handleCloseModal}>Close</Button>
            <Button variant="contained" component={Link}
                                            to={`/products/${product_id}`}>View Full Item</Button>
          </Paper>
      </Modal>    
    </React.Fragment>

    
  );
};

export default SingleProductModal;