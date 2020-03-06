import React from "react";
import axios from "./axioscopy";

export function Uploader({
    handleClick,
    handleChange,
    handleClose,
    url,
    first,
    last
}) {
    console.log("handleClick: ", handleClick);
    console.log("handleChange: ", handleChange);
    return (
        <div>
            <img src={url || "/default.jpg"} alt={`${first} ${last}`} />
            <form>
                <input
                    onChange={handleChange}
                    id="file"
                    type="file"
                    name="file"
                    accept="image/*"
                />
                <button onClick={handleClick}>submit</button>
                <button onClick={handleClose}>close</button>
            </form>
        </div>
    );

    //some kinf of form that enables uplaoding an image like imageboard and then post it through axios post request
}
// function onClick = () => {};
// return
// <div> onClick={}

////
//
// <input onChange={handleChange} id="file" type="file" name="file" accept="image/*">
// <button onClick={handleClick}>submit</button>
