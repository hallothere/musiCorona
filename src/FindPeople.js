import React, { useState, useEffect } from "react";
import axios from "./axioscopy";
import { Link } from "react-router-dom";

export function FindPeople() {
    // let first, last, url, id;
    const [users, setUsers] = useState();

    useEffect(() => {
        console.log("useEffect is running");
        // return () => {
        axios
            .get("/users.json")
            .then(({ data }) => {
                console.log("data after get /users: ", data.result);
                setUsers(data.result);
                // };
            })
            .catch(err => {
                console.log("err after get /users.json: ", err);
            });
    }, []);

    return (
        <div>
            <div className="findPeopleContainer">
                Find People
                <input
                    onChange={e => setUsers(e.target.value)}
                    placeholder="enter name here"
                />
                {users &&
                    users.map(user => (
                        <div key={user.id}>
                            <Link to={`/user/:${user.id}`}>
                                {user.first} {user.last}
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
}
