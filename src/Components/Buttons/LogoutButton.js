export async function handleLogout(setToken, setIsAdmin) {
    try {
        const response = await fetch('http://localhost:3001/api/users/logout', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            setToken(null);
            setIsAdmin(false);
            localStorage.removeItem('user-token');
            localStorage.removeItem('user-username');
            localStorage.removeItem('user-is_admin');
            localStorage.removeItem('user-id');
            localStorage.removeItem('order_id');

            window.location.href = '/';
        }
    } catch (error) {
        console.error(error);
    }
}