import React from "react";
function DbUpdatePatch() {
    return (
        <>
            <button onClick={callPatchBodyUsername}>Update partial</button>
        </>
    )
}
export default DbUpdatePatch;

function callPatchBodyUsername() {
    fetch("http://localhost:3001/users/elie/password", {
        method: "PATCH",
        body: JSON.stringify({
            password: "126"
        }),
        headers: {
            "Content-type": "application/json;charset=UTF-8",
        },
    })
        .then((data) => data.json())
        .then((json) =>
            alert(JSON.stringify(json)));
}
