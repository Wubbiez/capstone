import React, {useEffect} from "react";
import { Link } from "react-router-dom";

const Success = () => {
    useEffect(async () => {
        const url = new URL(window.location.href);
        const sessionId = url.searchParams.get("session_id");
        const response = await fetch(`http://localhost:3001/success?session_id=${sessionId}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({sessionId}),
        });


    }, []);

    return (
        <div>
            <h1>Thank you for your purchase!</h1>
            <Link to='/products'>Return to Products</Link>
        </div>
    )
}

export default Success;