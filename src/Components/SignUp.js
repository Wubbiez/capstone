import React, {useEffect, useState} from 'react'
import {
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Typography,
    Card,
    CardContent
} from '@mui/material'
import {createaUser} from "../api/apirequests.js";
const SignUp=({setUser, setToken})=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [phone, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    const [isSigningUp, setIsSigningUp] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("user-token");
        if (token) {
            setToken(token);
            const username = localStorage.getItem("user-username");
            setUsername(username);
        }
    }, [setToken, setUsername]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSigningUp(true);
        try {
            await createaUser(username, password, email,first_name, last_name, address, phone).then((r) => {
                setToken(r.token);
                setUser(r.username);
            }).then(() => {
                window.location.href = "/";
            })
        } catch (error) {
            console.error(error);
        } finally {
            setUsername("");
            setPassword("");
            setEmail("");
            setFirstName("");
            setLastName("");
            setPhoneNumber("");
            setAddress("");
        }
        setIsSigningUp(false);
    }

    return(
        <>
        <Typography gutterBottom variant="h3" align="center" color='secondary'>
            Get In Touch
        </Typography>
    <Grid>
        <Card elevation={10} style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
            <CardContent>
                <Typography gutterBottom variant="h5" align="center">
                    Sign Up
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" gutterBottom align="center">
                    Please fill this form to create an account!
                </Typography>
                <form onSubmit={handleSubmit} >
                    <Grid container spacing={1}>
                        <Grid xs={12} sm={6} item>
                            <TextField placeholder="Enter username" label="Username" variant="outlined" fullWidth required autoComplete="username"
                                       autoFocus
                                       value={username}
                                       onChange={(event) => {
                                           event.preventDefault();
                                           setUsername(event.target.value);
                                       }} />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <TextField placeholder="Enter password" label="Password" variant="outlined" type="password" fullWidth required
                                       value={password}
                                       onChange={(event) => {
                                           event.preventDefault();
                                           setPassword(event.target.value);
                                       }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="email" placeholder="Enter email" label="Email" variant="outlined" fullWidth required
                                       value={email}
                                       onChange={(event) => {
                                           event.preventDefault();
                                           setEmail(event.target.value);
                                       }}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <TextField type="text" placeholder="Enter first name" label="First Name" variant="outlined" fullWidth
                                       value={first_name}
                                       onChange={(event) => {
                                           event.preventDefault();
                                           setFirstName(event.target.value);
                                       }}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <TextField type="text" placeholder="Enter last name" label="Last Name" variant="outlined" fullWidth
                                       value={last_name}
                                       onChange={(event) => {
                                           event.preventDefault();
                                           setLastName(event.target.value);
                                       }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="number" placeholder="Enter phone number" label="Phone" variant="outlined" fullWidth
                                       value={phone}
                                       onChange={(event) => {
                                           event.preventDefault();
                                           setPhoneNumber(event.target.value);
                                       }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth >Submit</Button>
                        </Grid>

                    </Grid>
                </form>
            </CardContent>
        </Card>
    </Grid>
        </>
    )

}

export default SignUp;