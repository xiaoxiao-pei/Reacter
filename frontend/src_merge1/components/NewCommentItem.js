import React from "react";
import { MdOutlineDoneOutline } from "react-icons/md";
import { useState } from "react";
import "../css/posts.css";
import { IoCompassOutline } from "react-icons/io5";
function NewCommentItem({ post, updateComList }) {
  let user = localStorage.getItem("user");
  user = user && JSON.parse(user);

  const [newCom, setNewCom] = useState({});
  const addDate = new Date().toLocaleTimeString();
  console.log(addDate);

  const submitHandle = (event) => {
    console.log("create comment");
    event.preventDefault();
    fetch("http://localhost:3001/comments/create", {
      method: "POST",
      body: JSON.stringify({
        userId: user._id,
        commentContent: newCom.commentContent,
        commentTime: new Date(),
        postId: post._id,
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((data) => console.log(data.json()))
      .then(() => {
        console.log("add comment");
        fetch(`http://localhost:3001/posts/comments/${post._id}`, {
          method: "PATCH",
          body: JSON.stringify({
            id: post._id,
            postCommentCount: post.postCommentCount + 1,
          }),
          headers: {
            "Content-type": "application/json;charset=UTF-8",
          },
        }).catch((err) => {
          console.log(err);
        });
      })
      .then(() => updateComList(newCom));
  };

  const changeHandle = (e) => {
    setNewCom({
      ...newCom,
      commentContent: e.target.value,
      postId: post._id,
      userId: user._id,
      commentTime: new Date().toLocaleTimeString,
    });
  };
  console.log(newCom);

  return (
    <div className="commentItem">
      <div className="commentHead">
        <div className="commentHeadLeft">
          <div
            style={{
              backgroudImage: `url(http://localhost:3001/getImg/${user.userPhoto})`,
            }}
          ></div>
          <div className="commentHeadUsername">{user.userName}</div>
        </div>
        <div className="commentHeadRight">
          <span>{addDate}</span>
        </div>
      </div>

      <div className="commentBody">
        <textarea
          name="newContent"
          value={newCom.commentContent}
          onChange={changeHandle}
        ></textarea>
      </div>

      <div className="commentFooter">
        <MdOutlineDoneOutline
          className="addCommentDone"
          onClick={submitHandle}
        />
      </div>
    </div>
  );
}

export default NewCommentItem;
