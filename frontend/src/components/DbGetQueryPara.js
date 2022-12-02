import React from "react";
function DbGetQueryPara() {
    return (
        <>
            <button onClick={callGetQuery}>Get query param</button>
        </>
    )
}
export default DbGetQueryPara;

function callGetQuery() {
    fetch("http://localhost:3001/user?username=johnsmith", { method: "GET" })
        .then((data) => data.json())
        .then((json) =>
            alert(JSON.stringify(json)));
}
