import React, { useRef } from "react";
import { IoIosDoneAll } from "react-icons/io";
import { useState } from "react";

function NewCommentItem(postId) {
  // I actually need the whole user object
  //   const user = localStorage.getItem("user");
  const user = {
    _id: "638ce21e4c43b7b1ccbe7868",
    userEmail: "alice@gmail.com",
    userJoinTime: "2022-09-01 14:00:00",
    userIsAdmin: "false",
    userIsActive: "yes",
    userMotto: "I am Alice2",
    userphoto: "",
    userName: "Alice2",
  };

  const [newCom, setNewCom] = useState();

  const commentContentRef = new useRef();

  const submitHandle = () => {
    fetch("http://localhost:3001/comments/create", {
      method: "POST",
      body: JSON.stringify({
        userId: user.userId,
        commentContent: commentContentRef.current.value,
        commentTime: new Date(),
        postId: postId, // should be postContent
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((data) => data.JSON())
      .then(() => setNewCom(commentContentRef.current.value));
  };

  return (
    <div>
      <div className="comment-head">
        <span
          style={{
            backgroudImage: `url(http://localhost:3001/getImg/${user.postPhoto})`,
          }}
        ></span>
        <span>{user.userName}.</span>
      </div>
      <div className="comment-text">
        {newCom ? (
          <div>{commentContentRef}</div>
        ) : (
          <>
            <form onSubmit={submitHandle}>
              <textarea ref={commentContentRef}> </textarea>
              <IoIosDoneAll type="submit" />
            </form>
          </>
        )}
      </div>
      <div className="comment-footer"></div>
    </div>
  );
}

export default NewCommentItem;
