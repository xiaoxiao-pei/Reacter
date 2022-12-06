// import { FcComments } from "react-icons/fc";

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
        <div className="postCard">
          <div className="postCardLeft">
            <div className="postHead">
              <div className="postHeadLeft">
                <img src={owner.userPhoto} alt="avatar" />
                <span>{owner.userName}</span>
                <span></span>
              </div>
              <div className="postHeadRight">
                <div className="postDate">
                  <span>{sc.commentTime}</span>
                </div>
              </div>
            </div>

            <div className="postBody">
              <textarea
                value={sc.commentContent}
                className="postBody"
              ></textarea>
            </div>

            <div className="postFooter">
              <div className="deleteIcon">
                {sc.userId === userId && (
                  <TiDeleteOutline onClick={() => deleteComment(sc._id)} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CommentItem;
