import { useEffect, useState } from "react";

import "../css/authors.css";
import { RiArticleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
function Rec_list() {
  const [recAuthors, setRecAuthors] = useState([]);
  const navigate = useNavigate();
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
      .then((data) => setRecAuthors([...data.slice(0, 5)]));

    return () => setRecAuthors([]);
  }, []);

  const showRecPosts = (author) => {
    navigate(`/recAuthorPosts/${author._id}/${author.userName}`);
  };

  return (
    <div className="recList">
      <div className="recListHead" colSpan={3}>
        Recommended
      </div>

      {recAuthors !== undefined &&
        recAuthors.map((author, id) => (
          <div className="authorRow" key={id}>
            {/* {console.log(author)} */}

            <div
              className="authorImg"
              style={{
                backgroundImage: `url(http://localhost:3001/getImg/${author.userPhoto})`,
              }}
            ></div>

            <div>{author.userName}</div>
            <div>
              <RiArticleFill
                onClick={() => showRecPosts(author)}
                className="postIcon"
              />
              <span>{author.userPostCount}</span>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Rec_list;
