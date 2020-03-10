import React, { useState, useEffect } from "react";
import axios from "./axioscopy";
import { Link } from "react-router-dom";

export function FindPeople() {
    // let first, last, url, id;
    const [users, setUsers] = useState();
    const [searchUsers, setSearchUsers] = useState();

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

    useEffect(() => {
        console.log("searchUsers is running");
        // let searched = setUsers(e.target.value);
        axios
            .post("/searching", { searchUsers: searchUsers })
            .then(({ data }) => {
                console.log("data after post /searching: ", data.result);
                setUsers(data.result);
            })
            .catch(err => {
                console.log("err after post /searching: ", err);
            });
    }, [searchUsers]);

    return (
        <div>
            <div className="findPeopleContainer">
                Find People
                <input
                    onChange={e => setSearchUsers(e.target.value)}
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

// var bla = {
//     basket: [
//         {
//             name: "headphones",
//             price: 89.99
//         },
//         {
//             name: "cat food",
//             price: 88.13
//         },
//         {
//             name: "book",
//             price: 99.23
//         },
//         {
//             name: "shirt",
//             price: 93.23
//         }
//     ]
// };
//
// function test() {
//     // var basket = bla.basket;
//     var sum;
//
//     for (var i = 0; i < bla.basket; i++) {
//         var arr = [];
//         for (price in bla.basket[i]) {
//             arr.push(price);
//         }
//         const reducer = (accumulator, currentValue) =>
//             accumulator + currentValue;
//         sum = arr.reduce(reducer);
//     }
//     return sum;
// }
//
// test();
