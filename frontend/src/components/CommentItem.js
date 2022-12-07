// import { FcComments } from "react-icons/fc";
import "../css/posts.css";
import { TiDeleteOutline } from "react-icons/ti";
import React, { useState, useRef, useEffect } from "react";

function CommentItem({ sc }) {
  const user = localStorage.getItem("user");
  const userId = user._id;
  const [owner, setOwner] = useState({});
  const [disap, setDisap] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/users/:${userId}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        setOwner({ ...data });
      });
  }, []);

  console.log(owner);

  const deleteComment = (id) => {
    fetch(`http://localhost:3001/comments/${id}`, { method: "DELETE" })
      .then((data) => data.json())
      .then((data) => console.log(data))
      .then(() => setDisap(true));
  };

  console.log(userId);
  console.log(owner);

  return (
    <>
      {!disap && (
        <div className="commentItem">
          <div className="commentHead">
            <div className="commentHeadLeft">
              <div
                className="authorImg"
                style={{
                  backgroundImage: `url(https://hccryde.syd.catholic.edu.au/wp-content/uploads/sites/148/2019/05/Person-icon.jpg)`,
                  width: "20px",
                  height: "20px",
                  display: "inline-block",
                }}
              ></div>
              <span>{owner.userName}</span>
              <span></span>
            </div>
            <div className="commentHeadRight">
              <span>{sc.commentTime}</span>
            </div>
          </div>

          <div className="commentBody">
            <span>{sc.commentContent}</span>
          </div>

          <div className="commentFooter">
            {sc.userId === userId && (
              <TiDeleteOutline
                className="commentDelete"
                onClick={() => deleteComment(sc._id)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CommentItem;
