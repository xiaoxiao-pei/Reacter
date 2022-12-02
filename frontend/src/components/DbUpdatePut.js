import React from "react";
function DbUpdatePut() {
    return (
        <>
            <button onClick={callPutBody}>Update full</button>
        </>
    )
}
export default DbUpdatePut;

function callPutBody() {
    fetch("http://localhost:3001/users", {
        method: "PUT",
        body: JSON.stringify({
            username: "elie",
            password: "125"
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((data) => data.json())
        .then((json) =>
            alert(JSON.stringify(json)));
}