import React, {useEffect, useState} from 'react'
import {Avatar, Button, Grid, Link, Paper, TextField, Typography} from '@mui/material/'
import {LockOutlined} from '@mui/icons-material';
import {getLatestOrderId, loginUser} from '../api/apirequests.js';
import {styled} from "@mui/material";
import {useNavigate} from "react-router-dom";

const LoginForm = styled("form")(({theme}) => ({
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
}));

const Login = ({setToken, setIsAdmin}) => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const history = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("user-token");
        if (token) {
            setToken(token);
            const username = localStorage.getItem("user-username");
            setUsername(username);
        }
    }, [setToken, setUsername]);

    const paperStyle = {padding: "20px 20px", maxWidth: 450, margin: "20px auto"}
    const avatarStyle = {backgroundColor: '#1bbd7e'}
    // const btnstyle={margin:'8px 0'}

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await loginUser(username, password);
            const {user_id, token, is_admin} = response;
            console.log(user_id, token, is_admin);
            setToken(token);
            setIsAdmin(is_admin);
            setUserId(user_id);
            const orderResponse = await getLatestOrderId(user_id);
            localStorage.setItem("order_id", orderResponse.order_id);
            window.location.href = "http://localhost:3000/";

        } catch (error) {
            console.error(error);
        } finally {
            setUsername("");
            setPassword("");
        }
    };


    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlined/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <LoginForm onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(event) => {
                            event.preventDefault();
                            setUsername(event.target.value);
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => {
                            event.preventDefault();
                            setPassword(event.target.value);
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign In
                    </Button>

                </LoginForm>
                <Typography> Do you have an account ?
                    <Link href="https://www.gadgetgalaxy.link/signup">
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login