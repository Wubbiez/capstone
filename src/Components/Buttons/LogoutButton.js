import {useEffect, useState} from 'react';
import {Button} from '@mui/material';

function LogoutButton({setToken, setIsAdmin}) {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    async function handleClick() {
        setIsLoggingOut(true);

        try {
            const response = await fetch('http://localhost:3001/api/users/logout', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });

            if (response.ok) {
                setToken(null);
                setIsAdmin(false);
                localStorage.removeItem("user-token");
                localStorage.removeItem("user-username");
                localStorage.removeItem("user-is_admin");
                window.location.href = "/";
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoggingOut(false);
        }
    }

    return (
        <Button
            variant="contained"
            onClick={handleClick}
            disabled={isLoggingOut}
        >
            Log Out
        </Button>
    );
}

export default LogoutButton;