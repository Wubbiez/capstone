// import { useState, useEffect } from "react";
// import { Button } from "@mui/material";
//
// import { loginUser } from "../../api/apirequests.js";
//
// function LoginButton({setToken, setUsername, setPassword, username, password}) {
//     const [isLoggingIn, setIsLoggingIn] = useState(false);
//
//
//
//     async function handleSubmit(event) {
//         event.preventDefault();
//         setIsLoggingIn(true);
//         try {
//             await loginUser(username, password).then((r) => {
//                 setToken(r.token);
//                 setUsername(r.username);
//             })
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setUsername("");
//             setPassword("");
//         }
//         setIsLoggingIn(false);
//     }
//
//     return (
//         <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//             disabled={isLoggingIn}
//         >
//             Login
//         </Button>
//     );
//
// }
//
// export default LoginButton;