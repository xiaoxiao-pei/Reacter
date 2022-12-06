import React from "react";
import { MdOutlineDoneOutline } from "react-icons/md";
import { useState } from "react";
import "../css/posts.css";
function NewCommentItem({ postId, updateComList }) {
  // I actually need the whole user object
  //   const user = localStorage.getItem("user");
  const user = {
    _id: "638ce21e4c43b7b1ccbe7868",
    userEmail: "alice@gmail.com",
    userJoinTime: "2022-09-01 14:00:00",
    userIsAdmin: "false",
    userIsActive: "yes",
    userMotto: "I am Alice2",
    userPhoto: "",
    userName: "Alice2",
  };

  const [newCom, setNewCom] = useState();
  const addDate = new Date().toLocaleTimeString();
  console.log(addDate);

  const submitHandle = (event) => {
    console.log("create comment");
    event.preventDefault();
    fetch("http://localhost:3001/comments/create", {
      method: "POST",
      body: JSON.stringify({
        userId: user._id,
        commentContent: newCom,
        commentTime: new Date(),
        postId: postId, // should be postContent
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        console.log(newCom);
      })
      .then(() => updateComList(newCom));
  };

  const changeHandle = (e) => {
    setNewCom(e.target.value);
  };

  return (
    <div className="commentItem">
      <div className="commentHead">
        <div className="commentHeadLeft">
          <span
            style={{
              backgroudImage: `url(http://localhost:3001/getImg/${user.userPhoto})`,
            }}
          ></span>
          <span>{user.userName}</span>
          <span></span>
        </div>
        <div className="commentHeadRight">
          <span>{addDate}</span>
        </div>
      </div>

      <div className="commentBody">
        <textarea
          name="newContent"
          value={newCom}
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
