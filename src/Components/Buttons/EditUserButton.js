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
import {updateUser} from "../../api/apirequests.js";

function EditUserButton({
                            user_id,
                            username: initialUsername,
                            phone: initialPhone,
                            is_admin: initialAdmin,
                            address: initialAddress,
                            email: initialEmail,
                            first_name: initialFirstName,
                            last_name: initialLastName,
                            is_active: initialActive,
                            password: initialPassword,
                            setRefresh
                        }) {
   const [isEditing, setIsEditing] = useState(false);
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState(initialUsername);
    const [phone, setPhone] = useState(initialPhone);
    const [is_admin, setIsAdmin] = useState(initialAdmin);
    const [address, setAddress] = useState(initialAddress);
    const [email, setEmail] = useState(initialEmail);
    const [first_name, setFirstName] = useState(initialFirstName);
    const [last_name, setLastName] = useState(initialLastName);
    const [is_active, setIsActive] = useState(initialActive);
    const [password, setPassword] = useState(initialPassword);
    console.log("user_id", user_id, "username", initialUsername, "phone", initialPhone, "is_admin", initialAdmin, "address", initialAddress, "email", initialEmail, "first_name", initialFirstName, "last_name", initialLastName, "is_active", initialActive, "password", initialPassword)




    const handleClickOpen = () => {
        setUsername(initialUsername);
        setPhone(initialPhone);
        setIsAdmin(initialAdmin);
        setAddress(initialAddress);
        setEmail(initialEmail);
        setFirstName(initialFirstName);
        setLastName(initialLastName);
        setIsActive(initialActive);
        setPassword(initialPassword);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    async function handleSubmit() {
        setIsEditing(true);
        try {
            const response = await updateUser(user_id, username, email, first_name, last_name, address, phone, is_admin, is_active, password);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
        setIsEditing(false);
        setOpen(false);
        setRefresh(true);

    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit the user's information.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Username"
                        type="text"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        label="Phone"
                        type="text"
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <FormControl component="fieldset">
                        {is_admin ?? <RadioGroup
                            row
                            aria-label="is_admin"
                            name="is_admin"
                            value={is_admin}
                            onChange={(e) => setIsAdmin(e.target.value)}
                        >
                            <FormControlLabel value="true" control={<Radio/>} label="Admin"/>
                            <FormControlLabel value="false" control={<Radio/>} label="Not Admin"/>
                        </RadioGroup>}
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Address"
                        type="text"
                        fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        type="text"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="first_name"
                        label="First Name"
                        type="text"
                        fullWidth
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="last_name"
                        label="Last Name"
                        type="text"
                        fullWidth
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <FormControl component="fieldset">
                        <RadioGroup
                            row
                            aria-label="is_active"
                            name="is_active"
                            value={is_active}
                            onChange={(e) => setIsActive(e.target.value)}
                        >
                            <FormControlLabel value="true" control={<Radio/>} label="Active"/>
                            <FormControlLabel value="false" control={<Radio/>} label="Not Active"/>
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="text"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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


export default EditUserButton;