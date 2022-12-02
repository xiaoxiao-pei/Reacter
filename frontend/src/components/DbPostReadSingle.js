
import React from "react";
function DbPostReadSingle() {
    return (
        <>
            <button onClick={callGetBody}>Read single Post</button>
        </>
    )
}
export default DbPostReadSingle;

function callGetBody() {
    fetch("http://localhost:3001/users/get",
        {
            method: "POST",
            body: JSON.stringify({
                username: "elie",
            }),
            headers: { "Content-type": "application/json;charset=UTF-8", },
        })
        .then((data) => data.json())
        .then((json) =>
            alert(JSON.stringify(json)));
}
