import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "../css/authors.css";
import { RiArticleFill } from "react-icons/ri";
import { Navigate } from "react-router-dom";
function Rec_list() {
  const [recAuthors, setRecAuthors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/users", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => data.filter((d) => d.userIsAdmin !== true))
      .then((data) =>
        data.sort(function (a, b) {
          return b.postCount - a.postCount;
        })
      )
      .then((data) => setRecAuthors([...data]));

    return () => setRecAuthors([]);
  }, []);
  const showRecPosts = (userId) => {
    Navigate(`/home/recAuthorPosts/:${userId}`);
  };

  return (
    <div className="recList">
      <div className="recListHead" colSpan={3}>
        Recommended
      </div>

      {recAuthors !== undefined &&
        recAuthors.map((author, id) => (
          <>
            <div className="authorRow" key={id}>
              {console.log(author)}

              <div
                className="authorImg"
                style={{
                  backgroundImage: `url(https://hccryde.syd.catholic.edu.au/wp-content/uploads/sites/148/2019/05/Person-icon.jpg)`,
                  // author.userPhoto === ""
                  //   ? `url(https://hccryde.syd.catholic.edu.au/wp-content/uploads/sites/148/2019/05/Person-icon.jpg)`
                  // : `url(http://localhost:3001/getImg/${author.userPhoto})`,
                }}
              ></div>

              <div>{author.userName}</div>
              <div onClick={() => showRecPosts(author._id)}>
                <RiArticleFill className="postIcon" />
                <span>{author.userPostCount}</span>
              </div>
            </div>
          </>
        ))}
    </div>
  );
}

export default Rec_list;
