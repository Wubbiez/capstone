import React, {useEffect, useState} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link, FormControlLabel, Checkbox } from '@mui/material/'
import {LockOutlined} from '@mui/icons-material';
import { loginUser } from '../api/apirequests.js';
import {styled} from "@mui/material";

const LoginForm = styled("form")(({ theme }) => ({
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
}));

const Login=({setToken, setIsAdmin})=>{
    const [password, setPassword] = useState("");
    const [username,setUsername] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("user-token");
        if (token) {
            setToken(token);
            const username = localStorage.getItem("user-username");
            setUsername(username);
        }
    }, [setToken, setUsername]);

    const paperStyle={padding :"20px 20px",maxWidth:450, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    // const btnstyle={margin:'8px 0'}

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await loginUser(username, password)
                .then((r) => {
                    setToken(r.token);
                    setIsAdmin(r.is_admin);
                })
                .then(() => {
                    window.location.href = "/";
                });

        } catch (error) {
            console.error(error);
        } finally {
            setUsername("");
            setPassword("");
        }
    }

    return(
        <Grid>
             <Button  href='http://localhost:3000/'>back To Shopping</Button>
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
                <Typography > Do you have an account ?
                     <Link href="http://localhost:3000/signup" >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login