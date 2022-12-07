import { AiTwotoneHeart } from "react-icons/ai";

import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";

import { VscComment } from "react-icons/vsc";
import "../css/posts.css";

function PostCard({ p }) {
  const user = localStorage.getItem("user");

  const postContentRef = useRef();
  const navigate = useNavigate();
  const [ifShowComments, setShowComments] = useState(false);
  const [ifShowEdit, setIfShowEdit] = useState(true);
  const [ifLike, setIfLike] = useState(false);
  const [post, setPost] = useState(p);
  const [owner, setOwner] = useState({});
  const [disap, setDisap] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/users/:${p.userId}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        setOwner({ ...data });
      });
  }, []);

  console.log(owner);
  const showComments = () => {
    // logged in user id
    if (user) {
      ifShowComments ? setShowComments(false) : setShowComments(true);
    } else {
      navigate("/login");
    }
  };

  const addLike = (id) => {
    let postLikes;
    if (ifLike) {
      setIfLike(false);
      postLikes = post.postLikes - 1;
    } else {
      setIfLike(true);
      postLikes = post.postLikes + 1;
    }
    // change database
    fetch(`http://localhost:3001/posts/:${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        id: id,
        postLikes: postLikes,
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((data) => data.json())
      .then((data) => console.log(data));
    //change postList
    setPost({ ...post, postLikes: postLikes });
    console.log(post);

    // change postlist
  };

  const deletePost = (id) => {
    fetch(`http://localhost:3001/posts/${id}`, { method: "DELETE" })
      .then((data) => data.json())
      .then((data) => console.log(data))
      .then(() => setDisap(true));
  };

  const update = (id) => {
    fetch(`http://localhost:3001/posts/:${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        postId: id,
        postContent: postContentRef.current.value, // should be postContent
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    }).then((data) => data.json());
    setIfShowEdit(true);
    setPost({ ...post, postContent: postContentRef.current.value });
  };

  const edit = () => {
    setIfShowEdit(false);
  };

  return (
    <>
      {!disap && (
        <div className="post">
          <div className="postCard">
            <div className="postCardLeft">
              <div className="postHead">
                <div className="postHeadLeft">
                  <div
                    className="authorImg"
                    style={{
                      backgroundImage: `url(http://localhost:3001/getImg/${owner.userPhoto})`,
                      width: "30px",
                      height: "30px",
                    }}
                  ></div>

                  <span>{owner.userName}</span>
                  <span>{post.postTitle}</span>
                </div>
                <div className="postHeadRight">
                  <div className="postDate">
                    <span>{post.postTime}</span>
                  </div>
                </div>
              </div>

              <div className="postBody">
                {user &&
                  (post.userId === user._id && !ifShowEdit ? (
                    <textarea
                      defaultValue={post.postContent}
                      ref={postContentRef}
                      className="postBody"
                    ></textarea>
                  ) : (
                    <span>{post.postContent}</span>
                  ))}
              </div>

              <div className="postFooter">
                <div className="likeIcon">
                  <AiTwotoneHeart
                    style={{ color: ifLike && "red" }}
                    onClick={() => addLike(post._id)}
                  />
                  <span>{post.postLikes} </span>
                </div>

                <div className="showCommentIcon">
                  <VscComment
                    className="showCommentIcon"
                    style={{ color: ifShowComments && "orange" }}
                    onClick={showComments}
                  />
                </div>

                <div>
                  {user &&
                    post.userId === user._id &&
                    (!ifShowEdit ? (
                      <IoCheckmarkDoneCircle
                        className="postEditDoneIcon"
                        style={{ color: "green" }}
                        onClick={() => update(post._id)}
                      />
                    ) : (
                      <AiFillEdit
                        className="postEditIcon"
                        style={{ color: "blue" }}
                        onClick={edit}
                      />
                    ))}
                </div>

                <div className="deleteIcon">
                  {user && (post.userId === user._id || user.userIsAdmin) && (
                    <RiDeleteBin5Line
                      className="postDeleteIcon"
                      onClick={() => deletePost(post._id)}
                    />
                  )}
                </div>
              </div>
            </div>
            <div
              className="postCardPhoto"
              style={{
                backgroundImage: `url(http://localhost:3001/getImg/${owner.userPhoto})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* todo */}
            </div>
          </div>
          {ifShowComments ? <Comments postId={post._id} /> : null}
        </div>
      )}
    </>
  );
}

export default PostCard;
