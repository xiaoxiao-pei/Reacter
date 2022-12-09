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
  let user = localStorage.getItem("user");
  user = user && JSON.parse(user);

  const postContentRef = useRef();
  const navigate = useNavigate();
  const [ifShowComments, setShowComments] = useState(false);
  const [ifShowEdit, setIfShowEdit] = useState(true);
  const [ifLike, setIfLike] = useState(false);
  const [post, setPost] = useState(p);
  const [owner, setOwner] = useState({});
  const [disap, setDisap] = useState(false);

  useEffect(() => {
    console.log(p.userId);
    console.log("post card ...");
    fetch(`http://localhost:3001/users/${p.userId}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        setOwner({ ...data });
      });
    return () => setOwner([]);
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
    fetch(`http://localhost:3001/posts/likes/${id}`, {
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
    fetch(`http://localhost:3001/posts/${id}/${p.postPhoto}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then((data) => console.log(data))
      .then(() => {
        console.log("add comment");
        fetch(`http://localhost:3001/users/posts/${owner._id}`, {
          method: "PATCH",
          body: JSON.stringify({
            id: post._id,
            userPostCount: owner.postCommentCount - 1,
          }),
          headers: {
            "Content-type": "application/json;charset=UTF-8",
          },
        }).catch((err) => {
          alert("server error: " + err.message);
        });
      })
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
  console.log(post);
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
                {user && post.userId === user._id && !ifShowEdit ? (
                  <textarea
                    defaultValue={post.postContent}
                    ref={postContentRef}
                  ></textarea>
                ) : (
                  <div>{post.postContent}</div>
                )}
              </div>

              <div className="postFooter">
                <div>
                  <AiTwotoneHeart
                    className="likeIcon"
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
                backgroundImage: `url(http://localhost:3001/getImg/${post.postPhoto})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* todo */}
            </div>
          </div>
          {ifShowComments ? <Comments post={p} /> : null}
        </div>
      )}
    </>
  );
}

export default PostCard;
