import React, {useEffect} from "react";
import { Link } from "react-router-dom";

const Success = ({order, setOrder}) => {
    useEffect(() => {
        const url = new URL(window.location.href);
        const sessionId = url.searchParams.get("session_id");

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/success?session_id=${sessionId}`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({sessionId}),
                });

                if (response.ok) {
                    // handle successful response here
                } else {
                    // handle unsuccessful response here
                }

            } catch (error) {
                // handle error here
            }
        };

        fetchData();
        localStorage.removeItem('order_id');
        setOrder(null);

    }, []);


    return (
        <div>
            <h1>Thank you for your purchase!</h1>
            <Link to='/products'>Return to Products</Link>
        </div>
    )
}

export default Success;