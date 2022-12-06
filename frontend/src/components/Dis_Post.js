import { useEffect, useState } from "react";
import { useRef } from "react";
import { Dis_com } from "./Dis_com.js";
import { useNavigate } from "react-router-dom";

export const Dis_Post = () => {
  const [postList, setPostList] = useState([]);
  const user = {
    _id: "638b879d586eb1728419bb01",
  };
  // const user = localStorage.getItem("user");
  const [isAll, setIsAll] = useState(true);
  const postContentRef = useRef();
  const [ifShowComments, setShowComments] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("recAuthors");
    if (isAll) {
      fetch("http://localhost:3001/users", {
        method: "GET",
      })
        .then((data) => data.json())

        .then((data) => {
          data.map((d) => {
            console.log(d);
            setPostList((postList) => [...postList, d]);
          });
        });
    } else {
      fetch("http://localhost:3001/users/:id", {
        method: "GET",
      })
        .then((data) => data.json())

        .then((data) => {
          data.map((d) => {
            console.log(d);
            setPostList((postList) => [...postList, d]);
          });
        })

        .then(() => {
          setPostList((postList) => {
            postList.map((p) => [{ ...p }, "ifLike:false", "ifEdit:false"]);
          });
        });
    }
    return setPostList([]);
  }, [isAll]);

  const addLike = (post) => {
    if (post.ifLike) {
      post.ifLike = false;
      post.postcount = post.postcount - 1;
    } else {
      post.ifLike = true;
      post.postcount = post.postcount + 1;
    }
    // change database
    fetch(`http://localhost:3001/users/:${post._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        id: post._id,
        postcount: post.postcount,
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((data) => data.json())
      .then((data) => console.log(data))
      //change postList
      .then(() =>
        setPostList((postList) =>
          postList.map((p) =>
            p._id === post._id ? { ...p, postcount: post.postcount } : p
          )
        )
      );

    // change postlist
  };

  const deletePost = (id) => {
    fetch("http://localhost:3001/users/id", { method: "DELETE" })
      .then((data) => data.json())
      .then((json) => alert(JSON.stringify(json)))
      .then(() => setPostList(postList.filter((p) => p._id !== id)));
  };

  const edit = (id) => {
    setPostList((postList) =>
      postList.map((p) => (p._id === id ? { ...p, ifEdit: true } : p))
    );

    // change database
  };
  const update = (id) => {
    fetch(`http://localhost:3001/users/:${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        id: id,
        username: postContentRef.current.value, // should be postContent
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data) {
          setPostList((postList) =>
            postList.map((p) =>
              p._id === id
                ? {
                    ...p,
                    ifEdit: false,
                    username: postContentRef.current.value,
                  }
                : p
            )
          );
        }
      });
  };

  const showComments = () => {
    // logged in user id
    if (user._id !== undefined) {
      ifShowComments ? setShowComments(false) : setShowComments(true);
    } else {
      navigate("/login");
    }
  };

  // render
  return (
    <div>
      <div>
        <h1>Posts list</h1>
      </div>
      {console.log(postList.length)}
      {console.log(postList)}
      {postList.length > 0 &&
        postList.map((post, id) => (
          <div key={id}>
            {post.ifEdit ? (
              <textarea ref={postContentRef} length="100"></textarea>
            ) : (
              <span>{post.username}</span>
            )}
            {console.log(post.ifLike)}

            <img src={`http://localhost:3001/${post.photo}`} alt="" />
            <span>{post.postcount} </span>
            <button
              style={{ color: post.ifLike ? "red" : "green" }}
              onClick={() => addLike(post)}
            >
              Like
            </button>
            {/* if the post owner is the same as the logged user, display delete   button  */}
            {post.userId === user._id && (
              <button onClick={() => deletePost(post._id)}>Delete</button>
            )}
            {/* if the post owner is the same as the logged user, display edite (and update) button  */}
            {post.userId === user.id && post.ifEdit ? (
              <button
                style={{ color: "green" }}
                onClick={() => update(post._id)}
              >
                Update
              </button>
            ) : (
              <button
                style={{ color: "yellow" }}
                onClick={() => edit(post._id)}
              >
                Edit
              </button>
            )}
            <button onClick={showComments}>Comments</button>
          </div>
        ))}
      {ifShowComments ? <Dis_com /> : null}
    </div>
  );
};
