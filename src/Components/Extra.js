import {
    Avatar,
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
  } from "@mui/material";
  import Fridge from "../Images/images/fridge.jpg";
  import LapTop from "../Images/images/LapTop.webp";
  import tv from "../Images/images/tv.jpg";
  //import  Watch  from "../Images/images/Watch.jpg";
  import React from "react";
  
  const Extra = () => {
    return (
      <Box>
        <Typography align="center" bgcolor={"#1D3557"} color="white"  opacity='0.6'>
          Info
        </Typography>
        <List
          sx={{
           align: 'center',
            width: "100%",
            height: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <ListItem alignItems="flex-end">
            <ListItemAvatar>
              <Avatar
                sx={{ height: 80, width: 80 }}
                variant="square"
                alt="Remy Sharp"
                src={Fridge}
              />
            </ListItemAvatar>
            
            <ListItemText 
              secondary={" Water and ice dispensers. External dispensers for ice and water built into the refrigerator door."}
            />
          </ListItem><br></br><br></br>
          <ListItem alignItems="flex-end">
            <ListItemAvatar>
              <Avatar
                sx={{ height: 80, width: 80 }}
                variant="square"
                alt="Remy Sharp"
                src={tv}
              />
            </ListItemAvatar>
            <ListItemText
              secondary={" Every reason to turn your house into a smart home. "}
            />
          </ListItem><br></br><br></br>
          <ListItem alignItems="flex-end">
            <ListItemAvatar>
              <Avatar
                sx={{ height: 80, width: 80 }}
                variant="square"
                alt="Remy Sharp"
                src={LapTop}
              />
            </ListItemAvatar>
            <ListItemText
              secondary={" An ultraportable pro laptop for incredible performance on the go."}
            />
          </ListItem><br></br><br></br>
          <Divider variant="inset" component={"li"} />
        </List>
        
      </Box>
    );
  };
  
  export default Extra;