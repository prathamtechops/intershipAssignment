import { useEffect, useState } from "react";
import { DataList } from "../Components/DataList";
import Department from "../Components/Department";

const Home: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [number, setNumber] = useState<string>("");
    useEffect(() => {
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");
        const number = localStorage.getItem("number");
        setName(name as string);
        setEmail(email as string);
        setNumber(number as string);

        if (!name || !email || !number) {
            window.location.href = "/";
        }
    }, []);

    return (
        <>
            <h1>Welcome {name}</h1>
            <p>Email: {email}</p>
            <p>Number: {number}</p>

            <DataList />
            <Department />
        </>
    );
};

export default Home;
