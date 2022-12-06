// import { FcComments } from "react-icons/fc";
import "../css/posts.css";
import { TiDeleteOutline } from "react-icons/ti";
import React, { useState, useRef, useEffect } from "react";

function CommentItem({ sc }) {
  //   const userId = localStorage.getItem("userId");
  const userId = "638ce1464c43b7b1ccbe7867";
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
              <img src={owner.userPhoto} alt="avatar" />
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
