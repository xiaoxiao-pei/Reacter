import React from "react";
function DbGetPara() {
    return (
        <>
            <button onClick={callGetParams}>Get path param</button>
        </>
    )
}
export default DbGetPara;

function callGetParams() {
    fetch("http://localhost:3001/users/johnsmith",
        { method: "GET" })
        .then((data) => data.json())
        .then((json) =>
            alert(JSON.stringify(json)));
}
