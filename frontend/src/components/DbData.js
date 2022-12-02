import React from "react";
function DbData() {
    return (
        <>
            <button onClick={callGetAll}>Get all users</button>
        </>
    )
}
export default DbData;
/* Function that will make an API call to get all users, and then pop-up an alert with the results. 
*/
function callGetAll() {
    fetch("http://localhost:3001/users", { method: "GET" })
        .then((data) => data.json())
        .then((json) => alert(JSON.stringify(json)));
}
