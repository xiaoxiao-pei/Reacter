import { AiTwotoneHeart } from "react-icons/ai";
// import { FcComments } from "react-icons/fc";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";
// import { FaEdit } from "react-icons/fa";
import { VscComment } from "react-icons/vsc";
import "../css/posts.css";

function PostCard({ p }) {
  //   const userId = localStorage.getItem("userId");
  const userId = "638ce1464c43b7b1ccbe7867";
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
    if (userId !== undefined) {
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
  console.log(userId);
  console.log(owner);

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
                      backgroundImage: `url(https://hccryde.syd.catholic.edu.au/wp-content/uploads/sites/148/2019/05/Person-icon.jpg)`,
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
                {post.userId === userId && !ifShowEdit ? (
                  <textarea
                    defaultValue={post.postContent}
                    ref={postContentRef}
                    className="postBody"
                  ></textarea>
                ) : (
                  <span>{post.postContent}</span>
                )}
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
                  {post.userId === userId &&
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
                  {/* {(post.userId === userId || userId.userIsAdmin === true) && ( */}
                  {(post.userId === userId || true) && (
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
                backgroundImage: `url(https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989__480.jpg)`,
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