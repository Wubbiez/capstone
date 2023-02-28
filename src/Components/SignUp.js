import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, FormControlLabel, Checkbox} from '@mui/material'
import {LockOutlined} from '@mui/icons-material';
const SignUp=()=>{

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlined/></Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                <TextField label='Email' placeholder='Enter Email' fullWidth required/>
                <TextField label='Username' placeholder='Enter username' fullWidth required/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign up</Button>
                
            </Paper>
        </Grid>
    )
}

export default SignUp;