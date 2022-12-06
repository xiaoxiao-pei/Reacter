import { useEffect, useState } from "react";

function Rec_list() {
  const [recAuthors, setRecAuthors] = useState([]);

  useEffect(() => {
    console.log("recAuthors");
    fetch("http://localhost:3001/users", {
      method: "GET",
    })
      .then((data) => data.json())

      .then((data) => {
        data.map((d) => {
          console.log(d);
          setRecAuthors((recAuthors) => [...recAuthors, d]);
        });
      });
    setRecAuthors((recAuthors) => {
      recAuthors.map(async (a) => {
        let data = await fetch("http://localhost:3001/posts/userId", {
          method: "GET",
        });
        data = await data.json();
        a.postCount = data.length;
      });
      recAuthors.sort(function (a, b) {
        return a.postCount - b.postCount;
      });
    });
    return setRecAuthors([]);
  }, []);

  return (
    <div className="recList">
      <div className="recListHead">
        <h1 style={{ textAlign: "center" }}>Recommended</h1>
      </div>
      {recAuthors.length > 0 &&
        recAuthors.map((user, id) => (
          <div key={id} className="recRow">
            <img src={user.userPhoto} alt="user" />
            <span>{user.userName}</span>
            <span>{user.postount}</span>
          </div>
        ))}
    </div>
  );
}

export default Rec_list;
