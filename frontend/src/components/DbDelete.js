import React from "react";
function DbDelete() {
    return (
        <>
            <button onClick={callDeleteParams}>Delete</button>
        </>
    )
}
export default DbDelete;

function callDeleteParams() {
    fetch("http://localhost:3001/users/123",
        { method: "DELETE" })
        .then((data) => data.json())
        .then((json) =>
            alert(JSON.stringify(json)));
}
