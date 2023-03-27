import React, {useEffect, useState} from "react";
import {getUserById} from "../api/apirequests.js";
import {Box, Card, CardContent, Divider, Grid, styled, Typography} from "@mui/material";
import EditUserButton from "./Buttons/EditUserButton.js";

const StyledBox = styled(Box)({
    height: '90vh',
    width: '90vw',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'flex-start',

});
const StyledTypography = styled(Typography)({
    fontSize: 'calc(2rem + 2vw)',
    '@media (max-width: 600px)': {
        fontSize: 'calc(1.5rem + 1.5vw)',
    },
    marginTop: '2rem',
    marginBottom: '1rem'
});

function MyProfile() {
    // page to show all user info and allow user to edit their info
    const [user, setUser] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('user-username'));
    const [user_id, setUserId] = useState(localStorage.getItem('user-id'));
    const [phone, setPhone] = useState("");
    const [is_admin, setIsAdmin] = useState(localStorage.getItem('user-is_admin') === "true");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [is_active, setIsActive] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(localStorage.getItem('token'));


    useEffect(() => {
        async function getUser() {
            const user = await getUserById(user_id, token);
            setUser(user);
        }

        getUser();

    }, [user_id, refresh]);


    return (
        <React.Fragment>
            <StyledTypography variant="h2">My Profile</StyledTypography>
            <Divider style={{marginBottom: '1rem'}}/>
            <StyledBox>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card sx={{
                            backgroundColor: '#f5f5f5',
                            wordWrap: 'break-word',
                            // make sure the text doesn't overflow the card
                            overflow: 'hidden',
                            // truncate the text with an ellipsis
                            textOverflow: 'ellipsis',
                            // set the height of the card
                            height: '100%',
                            // make sure the card content is vertically centered
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            // scale the items in the card to fit
                            alignItems: 'stretch',
                        }}>
                            <CardContent>
                                <Typography variant="h6">User Id: </Typography>
                                <Typography variant="body1"> {user.user_id}</Typography>
                                <Typography variant="h6">Username: </Typography>
                                <Typography variant="body1">{user.username}</Typography>
                                <Typography variant="h6">Password: </Typography>
                                <Typography variant="body1"> {user.password}</Typography>
                                <Typography variant="h6">Email: </Typography>
                                <Typography variant="body1">  {user.email}</Typography>

                                {is_admin && <Typography variant="h6">Admin: </Typography>}
                                {is_admin && <Typography variant="body1"> {user.is_admin ? "Yes" : "No"}</Typography>}
                                <Typography variant="h6">Phone: </Typography>
                                <Typography variant="body1"> {user.phone}</Typography>
                                <Typography variant="h6">First Name: </Typography>
                                <Typography variant="body1"> {user.first_name}</Typography>
                                <Typography variant="h6">Last Name: </Typography>
                                <Typography variant="body1"> {user.last_name}</Typography>
                                <Typography variant="h6">Address: </Typography>
                                <Typography variant="body1"> {user.address}</Typography>
                                <Typography variant="h6">Active: </Typography>
                                <Typography variant="body1"> {user.is_active ? "Yes" : "No"}</Typography>
                                <EditUserButton variant="contained" color="secondary" username={user.username}
                                                password={user.password} email={user.email} phone={user.phone}
                                                first_name={user.first_name} last_name={user.last_name}
                                                address={user.address} user_id={user.user_id}
                                                is_admin={user.is_admin} is_active={user.is_active}
                                                setRefresh={setRefresh}/>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </StyledBox>
        </React.Fragment>
    )

}

export default MyProfile;
