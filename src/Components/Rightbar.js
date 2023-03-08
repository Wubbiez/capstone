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
  import React from "react";
  import Iconic from '../Images/images/Iconic.jpg';
import Smart from "../Images/images/Smart.jpg";
import Ultra from "../Images/images/Ultra.jpg";
  
  const Rightbar = () => {
    return (
      <Box>
        <Typography align="center" bgcolor={"black"} color="white">
          Most Popular
        </Typography>
        <List
          sx={{
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
                src={Iconic}
              />
            </ListItemAvatar>
            <ListItemText
              secondary= {"The most sold item in our store history"}
            />
          </ListItem>
          <ListItem alignItems="flex-end">
            <ListItemAvatar>
              <Avatar
                sx={{ height: 80, width: 80 }}
                variant="square"
                alt="Remy Sharp"
                src={Smart}
              />
            </ListItemAvatar>
            <ListItemText
              secondary={"The smart fridge where it can tell u when your food reaches the max temp"}
            />
          </ListItem>
          <ListItem alignItems="flex-end">
            <ListItemAvatar>
              <Avatar
                sx={{ height: 80, width: 80 }}
                variant="square"
                alt="Remy Sharp"
                src={Ultra}
              />
            </ListItemAvatar>
            <ListItemText
              secondary={"The Ultra fridge comes with a new TV"}
            />
          </ListItem>
          <Divider variant="inset" component={"li"} />
        </List>
        
        
      </Box>
    );
  };
  
  export default Rightbar;